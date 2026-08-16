import { AuthController } from "./auth/auth.controller.js";
import { DrizzleProfileRepository } from "./auth/repositories/impl/profile.drizzle.repository.js";
import { DrizzleUserRepository } from "./auth/repositories/impl/user.drizzle-repository.js";
import { DrizzleVerificationTokenRepository } from "./auth/repositories/impl/verification.drizzle-repository.js";
import { AuthService } from "./auth/services/impl/auth.service.js";
import { PasswordHasher } from "./auth/services/impl/password.hasher.js";
import { RegisterUseCase } from "./auth/usecases/impl/register.usecase.js";
import { db } from "./db/index.js";

import { EmailService } from "./auth/services/impl/email.service.js";
import { CryptoTokenGenerator } from "./auth/services/impl/token-generator.service.js";
import { RegistrationUnitOfWork } from "./auth/services/impl/registration.unit-of-work.js";
import { MailPitEmailService } from "./auth/services/impl/mailpit.service.js";

const userRepository = new DrizzleUserRepository(db);
const profileRepository = new DrizzleProfileRepository(db);
const verificationRepository = new DrizzleVerificationTokenRepository(db);

const passwordHasher = new PasswordHasher()
const tokenGenerator = new CryptoTokenGenerator()
const emailService = new MailPitEmailService()
const authService = new AuthService(profileRepository, userRepository)
const unitOfWork = new RegistrationUnitOfWork(db);

export const createRegisterUseCase = (): RegisterUseCase => {
    return new RegisterUseCase(
        userRepository,
        passwordHasher,
        tokenGenerator,
        emailService,
        unitOfWork
    )
}

export const createAuthController = () => {
    const registerUseCase = createRegisterUseCase()
    return new AuthController(registerUseCase)
}

