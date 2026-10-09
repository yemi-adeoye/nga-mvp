import { NewMediaPost } from "../../db/schema/social/schema.media.js";

export interface IMediaPostRepository {
    create(postMedia: NewMediaPost): Promise<void>
}