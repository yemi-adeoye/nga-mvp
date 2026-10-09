import { NewPostTag } from "../../db/schema/social/schema.tag.js"

export interface ITagPostRepository {
    create(postTag: NewPostTag): Promise<void>
    createMany(postTag: NewPostTag[]): Promise<void>
}