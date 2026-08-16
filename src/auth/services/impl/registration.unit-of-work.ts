import { DrizzleProfileRepository } from "../../repositories/impl/profile.drizzle.repository.js";
import { DrizzleUserRepository } from "../../repositories/impl/user.drizzle-repository.js";
import { DrizzleVerificationTokenRepository } from "../../repositories/impl/verification.drizzle-repository.js";
import { Database } from "../../../db/index.js";
import { ITransactionalRepositories } from "../../repositories/itransactional.repositories.js";
import { IUnitOfWork } from "../../../common/iunit-of-work.service.js";

export class RegistrationUnitOfWork implements IUnitOfWork {
    constructor(private readonly db: Database) { }

    execute<T>(work: (repositories: ITransactionalRepositories) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {

            const repos: ITransactionalRepositories =
            {
                user: new DrizzleUserRepository(tx),
                profile: new DrizzleProfileRepository(tx),
                verificationToken: new DrizzleVerificationTokenRepository(tx)
            }

            return work(repos)
        })
    }

}