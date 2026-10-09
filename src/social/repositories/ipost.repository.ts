import { NewPost } from "../../db/schema/social/schema.post.js";

export interface IPostRepository {
    create(post: NewPost): Promise<number>
}