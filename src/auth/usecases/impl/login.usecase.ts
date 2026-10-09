import { ACTIVE, VERIFICATION_PENDING } from "../../../constants/constants.js";
import { User } from "../../auth.model.js";
import { LoginException } from "../../error/login.exception.js";
import { IUserRepository } from "../../repositories/iuser.repository.js";
import { IPasswordHasher } from "../../services/ipassword-hasher.service.js";
import { LoginRequest } from "../../validation/login.schema.js";
import { ILoginUseCase } from "../iloginUseCase.js";

export class LoginUseCase implements ILoginUseCase {
    constructor(
        private readonly users: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,

    ) { }

    async execute(loginRequest: LoginRequest): Promise<string> {
        const { username, password } = loginRequest

        const user = await this.users.findByUsername(username)

        return await this.verifyUser(user, password)

    }

    private async verifyUser(user: User | null, password: string): Promise<string> {
        if (!user) {
            throw new LoginException("Invalid login credentials")
        }

        if (!await this.passwordHasher.verify(user.passwordHash, password)) {
            throw new LoginException("Invalid login credentials")
        }

        if (user.status == VERIFICATION_PENDING) {
            throw new LoginException(VERIFICATION_PENDING)
        }

        if (user.status != ACTIVE) {
            throw new LoginException("User is not active")
        }

        return user.id.toString()
    }
}