import { Database, Transaction } from "../../../db/index.js";
import { mediaTable, NewMedia } from "../../../db/schema/social/schema.media.js";
import { IMediaRepository } from "../imedia.repository.js";

export class DrizzleMediaRepository implements IMediaRepository {
    constructor(
        private readonly db: Database | Transaction
    ) { }
    async createMany(newMedia: NewMedia[]): Promise<number[]> {
        const result = await this.db
            .insert(mediaTable)
            .values(newMedia)
            .$returningId();

        return result.map(row => row.id);
    }

    async create(media: NewMedia): Promise<number> {
        const result = await this.db
            .insert(mediaTable)
            .values(media)
            .$returningId();

        return result[0].id
    }

}