import { NewMedia } from "../../db/schema/social/schema.media.js";

export interface IMediaRepository {
    create(media: NewMedia): Promise<number>
}