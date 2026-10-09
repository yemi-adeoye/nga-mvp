import { NewMediaPost } from "../../db/schema/social/schema.media.js";

export interface IMediaPostRepository {
    createMany(mediaPostIds: NewMediaPost[]): Promise<void>;
    create(postMedia: NewMediaPost): Promise<void>
}