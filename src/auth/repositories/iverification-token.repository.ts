import { VerificationTokenType } from "../../constants/constants.js";
import {
    NewVerificationToken,
    VerificationToken
} from "../../db/schema/auth/schema.verification.js";

export interface IVerificationTokenRepository {

    create(token: NewVerificationToken): Promise<void>;

    findByTokenHash(tokenHash: string): Promise<VerificationToken | null>;

    findByUserIdAndType(
        userId: number,
        type: VerificationTokenType
    ): Promise<VerificationToken | null>;

    deleteByUserIdAndType(
        userId: number,
        type: VerificationTokenType
    ): Promise<void>;

    markUsed(id: number): Promise<void>;
}