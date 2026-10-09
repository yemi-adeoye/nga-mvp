import { AuthenticatedUser } from "../../../auth/auth.model.js";
import { PostRequest } from "../../validation/post.validation.schema.js";

export interface INewPostUseCase {
    execute(postRequest: PostRequest, user: AuthenticatedUser, files: any): Promise<void>
}