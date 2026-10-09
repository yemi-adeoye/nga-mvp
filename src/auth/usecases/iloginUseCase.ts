import { LoginRequest } from "../validation/login.schema.js";

export interface ILoginUseCase {
    execute(loginRequest: LoginRequest): Promise<string>;
}