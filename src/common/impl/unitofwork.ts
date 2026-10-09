import { DrizzleProfileRepository } from "../../auth/repositories/impl/profile.drizzle.repository.js"
import { DrizzleUserRepository } from "../../auth/repositories/impl/user.drizzle-repository.js"
import { DrizzleVerificationTokenRepository } from "../../auth/repositories/impl/verification.drizzle-repository.js"
import { ITransactionalRepositories } from "../../auth/repositories/itransactional.repositories.js"
import { Database } from "../../db/index.js"
import { DrizzleMediaRepository } from "../../social/repositories/impl/media.repository.js"
import { DrizzleMediaPostRepository } from "../../social/repositories/impl/post.media.repository.js"
import { DrizzlePostRepository } from "../../social/repositories/impl/post.repository.js"
import { DrizzleTagPostRepository } from "../../social/repositories/impl/tag.post.repository.js"
import { DrizzleTagRepository } from "../../social/repositories/impl/tag.repository.js"
import { IUnitOfWork } from "../iunit-of-work.service.js"

export class UnitOfWork implements IUnitOfWork {
    constructor(private readonly db: Database) { }

    execute<T>(work: (repositories: ITransactionalRepositories) => Promise<T>): Promise<T> {
        return this.db.transaction((tx) => {
            const repos: ITransactionalRepositories =
            {
                user: new DrizzleUserRepository(tx),
                post: new DrizzlePostRepository(tx),
                profile: new DrizzleProfileRepository(tx),
                verificationToken: new DrizzleVerificationTokenRepository(tx),
                media: new DrizzleMediaRepository(tx),
                mediaPost: new DrizzleMediaPostRepository(tx),
                tag: new DrizzleTagRepository(tx),
                tagPost: new DrizzleTagPostRepository(tx)
            }

            return work(repos)
        })
    }

}