import { IPasswordHasher } from "../ipassword-hasher.service.js";
import * as argon2 from "argon2"

export class PasswordHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        return await argon2.hash(password)
    }

    async verify(hashedPassword: string, password: string): Promise<boolean> {
        return await argon2.verify(hashedPassword, password)
    }

}