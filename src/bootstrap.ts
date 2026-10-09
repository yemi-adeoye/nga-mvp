import { AuthController } from "./auth/auth.controller.js";
import { DrizzleProfileRepository } from "./auth/repositories/impl/profile.drizzle.repository.js";
import { DrizzleUserRepository } from "./auth/repositories/impl/user.drizzle-repository.js";
import { DrizzleVerificationTokenRepository } from "./auth/repositories/impl/verification.drizzle-repository.js";
import { PasswordHasher } from "./auth/services/impl/password.hasher.js";
import { RegisterUseCase } from "./auth/usecases/impl/register.usecase.js";
import { db } from "./db/index.js";

import { CryptoTokenService } from "./auth/services/impl/crypto-token.service.js";
import { MailPitEmailService } from "./auth/services/impl/mailpit.service.js";
import { VerifyUseCase } from "./auth/usecases/impl/verify.usecase.js";
import { LoginUseCase } from "./auth/usecases/impl/login.usecase.js";
import { SessionUseCase } from "./auth/usecases/impl/session.usecase.js";
import { DrizzleSessionRepository } from "./auth/repositories/impl/session.repository.js";
import { SocialController } from "./social/social.controller.js";
import { NewPostUseCase } from "./social/usecases/impl/newpost.usecase.js";
import { DrizzlePostRepository } from "./social/repositories/impl/post.repository.js";
import { UnitOfWork } from "./common/impl/unitofwork.js";
import { IMediaStorageService } from "./social/services/istorage.service.js";
import { LocalS3Service } from "./social/services/impl/local.s3.service.js";

export const userRepository = new DrizzleUserRepository(db);
const profileRepository = new DrizzleProfileRepository(db);
const verificationRepository = new DrizzleVerificationTokenRepository(db);
const sessionRepository = new DrizzleSessionRepository(db)
const postRepository = new DrizzlePostRepository(db)

const passwordHasher = new PasswordHasher()
const tokenGenerator = new CryptoTokenService()
const tokenHasher = new CryptoTokenService()
const emailService = new MailPitEmailService()

const unitOfWork = new UnitOfWork(db)

export const createRegisterUseCase = (): RegisterUseCase => {
    return new RegisterUseCase(
        userRepository,
        passwordHasher,
        tokenGenerator,
        tokenHasher,
        emailService,
        unitOfWork
    )
}

export const createLoginUseCase = (): LoginUseCase => {
    return new LoginUseCase(userRepository, passwordHasher)
}

export const createVerifyUseCase = (): VerifyUseCase => {
    return new VerifyUseCase(tokenHasher, verificationRepository, unitOfWork)
}

export const createSessionUseCase = (): SessionUseCase => {
    return new SessionUseCase(sessionRepository, tokenHasher)
}

export const createMediaStorageService = (): IMediaStorageService => {
    return new LocalS3Service()
}

export const createNewPostUseCase = (): NewPostUseCase => {
    return new NewPostUseCase(postRepository, unitOfWork, createMediaStorageService())
}

export const createAuthController = () => {
    const registerUseCase = createRegisterUseCase()
    const verifyUseCase = createVerifyUseCase()
    const loginUseCase = createLoginUseCase()
    const sessionUseCase = createSessionUseCase()
    return new AuthController(registerUseCase, verifyUseCase, loginUseCase, sessionUseCase)
}

export const createSocialController = () => {
    return new SocialController(createNewPostUseCase());
}
