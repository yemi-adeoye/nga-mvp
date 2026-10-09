import { AuthenticatedUser } from "../../../auth/auth.model.js";
import { TagRequest } from "../../validation/tag.validation.schema.js";

export interface INewTagUseCase {
    execute(postRequest: TagRequest, user: AuthenticatedUser): Promise<void>
}