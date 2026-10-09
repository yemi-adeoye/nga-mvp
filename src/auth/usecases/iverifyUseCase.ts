import { VerificationValidationToken } from "../validation/verify-email.schema.js";

export interface IVerifyUseCase {
    execute(token: VerificationValidationToken): void;
}