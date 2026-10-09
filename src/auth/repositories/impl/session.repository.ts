import { eq } from "drizzle-orm";
import { Database, Transaction } from "../../../db/index.js";
import { NewSession, SessionRow, sessionTable } from "../../../db/schema/auth/schema.sessions.js";
import { Session } from "../../auth.model.js";
import { ISessionRepository } from "../isession.repository.js";


export class DrizzleSessionRepository implements ISessionRepository {
    constructor(
        private readonly db: Database | Transaction
    ) { }

    async create(session: NewSession): Promise<void> {
        await this.db.insert(sessionTable).values(session)
    }

    async findByUserId(userId: number): Promise<SessionRow | null> {
        const result = await this
            .db.select()
            .from(sessionTable)
            .where(eq(sessionTable.userId, userId))
            .limit(1)
        return this.toDomain(result[0])
    }

    async findByTokenHash(
        tokenHash: string
    ): Promise<SessionRow | null> {

        const result = await this.db
            .select()
            .from(sessionTable)
            .where(eq(sessionTable.refreshTokenHash, tokenHash))
            .limit(1);

        return this.toDomain(result[0]);
    }

    private toDomain(row?: SessionRow): SessionRow | null {
        if (!row) {
            return null
        }
        return {
            userAgent: row.userAgent!,
            userId: row.userId!,
            accessTokenExpireAt: row.accessTokenExpireAt,
            refreshTokenExpireAt: row.refreshTokenExpireAt,
            refreshTokenHash: row.refreshTokenHash,
            ipAddress: row.ipAddress!,
            createdAt: row.createdAt,
            revokedAt: null,
            id: row.id,
            lastUsedAt: null,
        }
    }

    private toSessionRow(session: Session): NewSession {
        return {
            userId: session.userId,
            userAgent: session.userAgent,
            ipAddress: session.ipAddress,
            lastUsedAt: new Date(Date.now()),
            refreshTokenHash: session.refreshTokenHash,
            accessTokenExpireAt: session.accessTokenExpireAt,
            refreshTokenExpireAt: session.refreshTokenExpireAt
        }
    }
}