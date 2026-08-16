import { DrizzleProfileRepository } from "../../repositories/impl/profile.drizzle.repository.js";
import { DrizzleUserRepository } from "../../repositories/impl/user.drizzle-repository.js";
import { IAuthService } from "../iauth.service.js";

export class AuthService implements IAuthService {
    constructor(
        private readonly profiles: DrizzleProfileRepository,
        private readonly users: DrizzleUserRepository
    ) { }

    async ensureEmailIsAvailable(email: string): Promise<boolean> {
        const emailExists = await this.users.emailExists(email)

        return !emailExists
    }

    async ensureUsernameIsAvailable(username: string): Promise<boolean> {
        const usernameExists = await this.users.findByUsername(username)

        return !usernameExists
    }

    async userIsOldEnough(dateOfBirth: Date): Promise<boolean> {
        const today = new Date();

        let age = today.getFullYear() - dateOfBirth.getFullYear();

        const hasHadBirthdayThisYear =
            today.getMonth() > dateOfBirth.getMonth() ||
            (
                today.getMonth() === dateOfBirth.getMonth() &&
                today.getDate() >= dateOfBirth.getDate()
            );

        if (!hasHadBirthdayThisYear) {
            age--;
        }
        return age >= 13;
    }

}
