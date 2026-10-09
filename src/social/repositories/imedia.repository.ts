import { NewMedia } from "../../db/schema/social/schema.media.js";

export interface IMediaRepository {
    createMany(newMedia: NewMedia[]): Promise<number[]>;
    create(media: NewMedia): Promise<number>
}