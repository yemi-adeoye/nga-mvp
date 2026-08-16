import { IUnitOfWork } from "../../../common/iunit-of-work.service.js";
import { NGS_NO_REPLY_EMAIL } from "../../../constants/constants.js";
import { NewProfile } from "../../../db/schema/auth/schema.profile.js";
import { NewUser } from "../../../db/schema/auth/schema.users.js";
import { NewVerificationToken } from "../../../db/schema/auth/schema.verification.js";
import { EmailMessage } from "../../auth.model.js";
import { UserIsNotOldEnoughException } from "../../error/age.exception.js";
import { EmailAlreadyExistsException } from "../../error/email.exception.js";
import { PhoneAlreadyExistsException } from "../../error/phone.exception.js";
import { UsernameAlreadyExistsException } from "../../error/username.exception.js";
import { IUserRepository } from "../../repositories/iuser.repository.js";
import { IEmailService } from "../../services/iemail.service.js";
import { IPasswordHasher } from "../../services/ipassword-hasher.service.js";
import { ITokenGenerator } from "../../services/itoken-generator.service.js";
import { RegisterRequest } from "../../validation/register.schema.js";
import { IRegisterUseCase } from "../iregisterUseCase.js";

export class RegisterUseCase implements IRegisterUseCase {
    constructor(
        private readonly users: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenGenerator: ITokenGenerator,
        private readonly emailService: IEmailService,
        private readonly unitOfWork: IUnitOfWork
    ) { }

    // this will be modified to use unit of work
    async execute(registerRequest: RegisterRequest) {

        await this.unitOfWork.execute(async (repos) => {
            const { email, username, dateOfBirth, phone, password } = registerRequest

            await this.validateBusinessRequirements(email, phone, username, dateOfBirth)

            // hash password
            const passwordHash = await this.passwordHasher.hash(password)
            registerRequest.password = passwordHash

            // create user
            const user = this.createUser(registerRequest, passwordHash)
            const userId = await repos.user.create(user)

            // create and insert profile
            const profile = this.createProfile(registerRequest, userId)
            await repos.profile.create(profile)

            // create and insert token
            const tokens = this.createVerificationToken(userId)
            await repos.verificationToken.create(tokens.verificationToken)

            const emailMessage = this.createEmail(registerRequest, tokens.rawToken)

            await this.emailService.send(emailMessage)
        })


    }

    private async validateBusinessRequirements(email: string, phone: string | undefined, username: string, dateOfBirth: Date): Promise<void> {
        // ensure email and username are not taken
        if (!await this.ensureEmailIsAvailable(email)) {
            throw new EmailAlreadyExistsException(email)
        }

        if (phone && !await this.ensurePhoneisAvailable(phone)) {
            throw new PhoneAlreadyExistsException(phone)
        }

        if (! await this.ensureUsernameIsAvailable(username)) {
            throw new UsernameAlreadyExistsException(username)
        }

        // ensure user is old enough
        if (!this.userIsOldEnough(dateOfBirth)) {
            throw new UserIsNotOldEnoughException(dateOfBirth.toISOString())
        }
    }

    private async ensureEmailIsAvailable(email: string): Promise<boolean> {
        const emailExists = await this.users.emailExists(email)

        return !emailExists
    }

    private async ensureUsernameIsAvailable(username: string): Promise<boolean> {
        const usernameExists = await this.users.findByUsername(username)

        return !usernameExists
    }

    private async ensurePhoneisAvailable(phone: string): Promise<boolean> {
        const phoneExists = await this.users.phoneExists(phone)

        return !phoneExists;
    }

    private userIsOldEnough(dateOfBirth: Date): boolean {
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

    private createUser(request: RegisterRequest, passwordHash: string): NewUser {
        return {
            username: request.username,
            email: request.email,
            passwordHash,
            phone: request.phone,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

    private createProfile(request: RegisterRequest, userId: number): NewProfile {
        return {
            userId,
            firstName: request.firstName,
            lastName: request.lastName,
            dateOfBirth: request.dateOfBirth,
            displayName: request.username,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }

    private createVerificationToken(userId: number): {
        verificationToken: NewVerificationToken;
        rawToken: string;
    } {

        const rawToken = this.tokenGenerator.generate();

        const tokenHash = this.tokenGenerator.hash(rawToken);

        const expiresAt = new Date(
            Date.now() + 24 * 60 * 60 * 1000
        );

        const verificationToken: NewVerificationToken = {
            userId,
            type: "EMAIL_VERIFICATION",
            tokenHash,
            expiresAt
        };

        return {
            verificationToken,
            rawToken
        };
    }

    private createEmail(registerRequest: RegisterRequest, rawToken: string): EmailMessage {
        return {
            to: registerRequest.email,
            from: NGS_NO_REPLY_EMAIL,
            subject: "Verify your email",
            text: '',
            html: `Hello ${registerRequest.username}, <br> Welcome to </b>naijagistsoccer</b>
            <p>Please click on the link below to register your email</p>

            <a href="localhost:9000/auth/verify?token=${rawToken}">Verify Email</a>"

            <b>NaijaGistSoccer</b>
            `

        }
    }
}
