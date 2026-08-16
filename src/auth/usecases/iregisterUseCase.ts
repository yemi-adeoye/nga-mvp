import { RegisterRequest } from "../validation/register.schema.js";

export interface IRegisterUseCase {
    execute(registerRequest: RegisterRequest): void;
}