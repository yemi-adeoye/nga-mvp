import { Database, Transaction } from "../../../db/index.js";
import { NewPostTag, postTagTable } from "../../../db/schema/social/schema.tag.js";
import { ITagPostRepository } from "../itagpost.repository.js";

export class DrizzleTagPostRepository implements ITagPostRepository {
    constructor(
        private readonly db: Database | Transaction
    ) { }
    async create(postTag: NewPostTag): Promise<void> {
        await this.db
            .insert(postTagTable)
            .values(postTag)
    }

    async createMany(postTag: NewPostTag[]): Promise<void> {
        await this.db
            .insert(postTagTable)
            .values(postTag)
    }
}