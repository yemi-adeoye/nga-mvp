import { Database, Transaction } from "../../../db/index.js";
import { NewPost, postTable } from "../../../db/schema/social/schema.post.js";
import { IPostRepository } from "../ipost.repository.js";

export class DrizzlePostRepository implements IPostRepository {
    constructor(
        private readonly db: Database | Transaction
    ) { }

    async create(post: NewPost): Promise<number> {
        const result = await this.db
            .insert(postTable)
            .values(post)
            .$returningId();

        return result[0].id
    }

}