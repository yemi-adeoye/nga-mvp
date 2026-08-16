import { ItransactionalRepositories } from "../../repositories/itransactional.repositories.js";
import { IUnitOfWork } from "../../../common/iunit-of-work.service.js";
import { Database, Transaction } from "../../../db/index.js";
import { DrizzleProfileRepository } from "../../repositories/impl/profile.drizzle.repository.js";
import { DrizzleUserRepository } from "../../repositories/impl/user.drizzle-repository.js";
import { DrizzleVerificationTokenRepository } from "../../repositories/impl/verification.drizzle-repository.js";

class DrizzleUnitOfWork implements IUnitOfWork {
    execute<T>(work: (repositories: ITransactionalRepositories) => Promise<T>): Promise<T> {



        return work(repositories)
    }


}