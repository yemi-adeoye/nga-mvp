import { and, eq } from "drizzle-orm";
import { Database, Transaction } from "../../../db/index.js";


import { IVerificationTokenRepository } from "../iverification-token.repository.js";
import { NewVerificationToken, VerificationToken, verificationTokenTable } from "../../../db/schema/auth/schema.verification.js";
import { VerificationTokenType } from "../../../constants/constants.js";


export class DrizzleVerificationTokenRepository
    implements IVerificationTokenRepository {

    constructor(
        private readonly db: Database | Transaction
    ) { }

    async create(token: NewVerificationToken): Promise<void> {

        await this.db
            .insert(verificationTokenTable)
            .values(token);
    }

    async findByTokenHash(
        tokenHash: string
    ): Promise<VerificationToken | null> {

        const result = await this.db
            .select()
            .from(verificationTokenTable)
            .where(eq(verificationTokenTable.tokenHash, tokenHash))
            .limit(1);

        return this.toDomain(result[0]);
    }

    async findByUserIdAndType(
        userId: number,
        type: VerificationTokenType
    ): Promise<VerificationToken | null> {

        const result = await this.db
            .select()
            .from(verificationTokenTable)
            .where(
                and(
                    eq(verificationTokenTable.userId, userId),
                    eq(verificationTokenTable.type, type)
                )
            )
            .limit(1);

        return this.toDomain(result[0]);
    }

    async deleteByUserIdAndType(
        userId: number,
        type: VerificationTokenType
    ): Promise<void> {

        await this.db
            .delete(verificationTokenTable)
            .where(
                and(
                    eq(verificationTokenTable.userId, userId),
                    eq(verificationTokenTable.type, type)
                )
            );
    }

    async markUsed(id: number): Promise<void> {

        await this.db
            .update(verificationTokenTable)
            .set({
                usedAt: new Date(),
            })
            .where(eq(verificationTokenTable.id, id));
    }

    private toDomain(row?: VerificationToken): VerificationToken | null {

        if (!row) {
            return null;
        }

        return {
            id: row.id,
            userId: row.userId,
            type: row.type,
            tokenHash: row.tokenHash,
            expiresAt: row.expiresAt,
            usedAt: row.usedAt,
            createdAt: row.createdAt,
        };
    }

    private toVerificationTokenRow(token: VerificationToken): NewVerificationToken {

        return {
            userId: token.userId,
            type: token.type,
            tokenHash: token.tokenHash,
            expiresAt: token.expiresAt,
            usedAt: token.usedAt,
        };
    }
}