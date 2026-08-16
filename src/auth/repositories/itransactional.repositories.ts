import { IProfileRepository } from "./iprofile.repository.js";
import { IUserRepository } from "./iuser.repository.js";
import { IVerificationTokenRepository } from "./iverification-token.repository.js";

export interface ITransactionalRepositories {
    user: IUserRepository
    profile: IProfileRepository
    verificationToken: IVerificationTokenRepository
}