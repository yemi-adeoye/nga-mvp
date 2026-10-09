import { Database, Transaction } from "../../../db/index.js";
import { mediaPostTable, NewMediaPost } from "../../../db/schema/social/schema.media.js";
import { IMediaPostRepository } from "../ipostmedia.repository.js";

export class DrizzleMediaPostRepository implements IMediaPostRepository {
    constructor(
        private readonly db: Database | Transaction
    ) { }

    async createMany(mediaPostIds: NewMediaPost[]): Promise<void> {
        await this.db
            .insert(mediaPostTable)
            .values(mediaPostIds)
            .$returningId();

    }


    async create(postMedia: NewMediaPost): Promise<void> {
        await this.db
            .insert(mediaPostTable)
            .values(postMedia)
    }

}