import { NewTag } from "../../db/schema/social/schema.tag.js"

export interface ITagRepository {
    create(tag: NewTag): Promise<number>
    createMany(tag: NewTag[]): Promise<void>
}