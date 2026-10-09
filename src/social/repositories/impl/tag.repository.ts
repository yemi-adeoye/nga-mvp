import { Database, Transaction } from "../../../db/index.js";
import { NewTag, tagTable } from "../../../db/schema/social/schema.tag.js";
import { ITagRepository } from "../itag.repository.js";

export class DrizzleTagRepository implements ITagRepository {

    constructor(
        private readonly db: Database | Transaction
    ) { }

    async create(tag: NewTag): Promise<number> {
        const result = await this.db
            .insert(tagTable)
            .values(tag)
            .$returningId()

        return result[0].id
    }

    createMany(tag: NewTag[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

}