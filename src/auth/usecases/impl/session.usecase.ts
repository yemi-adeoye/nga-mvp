import { ISSUER } from "../../../constants/constants.js";
import { ISessionUseCase } from "../isessionUseCase.js";
import { randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import { ISessionRepository } from "../../repositories/isession.repository.js";
import { NewSession, SessionRow } from "../../../db/schema/auth/schema.sessions.js";
import { ITokenHasher } from "../../services/itoken-hasher.service.js";
import { Session } from "../../auth.model.js";
import { LoginException } from "../../error/login.exception.js";

export interface SessionDetails {
    accessToken: string,
    refreshToken: string
}

export interface UserInfo {
    identifier: string
    userAgent?: string
    ipAddress?: string
}

export interface SessionTokens {
    accessToken: string,
    refreshToken: string,
    accessTokenExpiresAt: Date
    refreshTokenExpiresAt: Date
}

export class SessionUseCase implements ISessionUseCase {

    constructor(
        private readonly sessionRepository: ISessionRepository,
        private readonly tokenService: ITokenHasher
    ) { }


    async createSession(userInfo: UserInfo): Promise<SessionDetails> {

        const tokens = this.createSessionToken(userInfo.identifier)
        const refreshTokenHash = this.tokenService.hash(tokens.refreshToken)

        const session: NewSession = {
            userId: parseInt(userInfo.identifier),
            accessTokenExpireAt: tokens.accessTokenExpiresAt,
            refreshTokenExpireAt: tokens.refreshTokenExpiresAt,
            revokedAt: null,
            ipAddress: userInfo.ipAddress,
            userAgent: userInfo.userAgent,
            refreshTokenHash
        }

        await this.saveSession(session)

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        }
    }

    createSessionToken(subject: string): SessionTokens {
        const ACCESS_TOKEN_TTL_SECONDS = 15 * 60
        const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000

        const accessTokenExpiresAt = new Date(Date.now() + ACCESS_TOKEN_TTL_SECONDS * 1000)
        const refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS)

        const accessToken = this.generateAccessToken(subject)

        const refreshToken = randomBytes(32).toString('hex');

        return { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt }
    }

    async saveSession(session: NewSession) {
        this.sessionRepository.create(session)
    }

    private generateAccessToken(subject: string) {
        const payload = { sub: subject, issuer: ISSUER, }
        const secret = process.env.NGS_SECRET

        if (!secret) {
            throw new Error('NGS secret is not configured')
        }

        const accessToken = jwt.sign(payload, secret, { expiresIn: '15m', audience: 'ngs-api' })

        return accessToken
    }

    async verifyRefreshToken(refreshToken: string): Promise<number | boolean> {
        const hashToken = this.tokenService.hash(refreshToken)

        const session = await this.sessionRepository.findByTokenHash(hashToken)

        if (session == null) {
            return false
        }

        if (!this.isValidRefreshToken(session)) {
            return false
        }

        return session.userId ? session.userId : false

    }

    private isValidRefreshToken(session: SessionRow): boolean {
        return new Date(Date.now()) < session.refreshTokenExpireAt || session.revokedAt !== null
    }

    async refreshToken(refreshToken: string): Promise<string> {

        const userId = await this.verifyRefreshToken(refreshToken)

        if (userId === false) {
            throw new LoginException('Invalid Credentials')
        }

        return this.generateAccessToken(userId.toString())
    }
}