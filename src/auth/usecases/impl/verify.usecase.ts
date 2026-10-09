import { IUnitOfWork } from "../../../common/iunit-of-work.service.js";
import { VerificationToken } from "../../../db/schema/auth/schema.verification.js";
import { EmailVerificationException } from "../../error/email.verification.exception.js";
import { IVerificationTokenRepository } from "../../repositories/iverification-token.repository.js";
import { ITokenHasher } from "../../services/itoken-hasher.service.js";
import { VerificationValidationToken } from "../../validation/verify-email.schema.js";
import { IVerifyUseCase } from "../iverifyUseCase.js";

export class VerifyUseCase implements IVerifyUseCase {
    constructor(private readonly tokenHasher: ITokenHasher, private readonly repos: IVerificationTokenRepository, private readonly unitOfWork: IUnitOfWork) {

    }

    async execute(token: VerificationValidationToken): Promise<void> {

        await this.unitOfWork.execute(async (repos) => {
            const tokenHash = this.tokenHasher.hash(token.token)

            const tokenHashDb: VerificationToken | null = await repos.verificationToken.findByTokenHash(tokenHash)

            const isValidToken = this.isValidToken(tokenHashDb);

            if (tokenHashDb && isValidToken) {
                await repos.verificationToken.markUsed(tokenHashDb.id)
                repos.user.verifyEmail(tokenHashDb?.userId)
            }

        })


    }

    private isValidToken(tokenHashDb: VerificationToken | null): boolean {

        if (!tokenHashDb) {
            throw new EmailVerificationException(`Token is invalid`);
        }

        if (tokenHashDb.usedAt) {
            throw new EmailVerificationException(`Token has already been used`);
        }

        if (tokenHashDb.expiresAt.getTime() <= Date.now()) {
            throw new EmailVerificationException(`Token has expired`);
        }

        return true;
    }

}