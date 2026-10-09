import { AuthenticatedUser } from "../../../../auth/auth.model.js";
import { ITagRepository } from "../../../repositories/itag.repository.js";
import { TagRequest } from "../../../validation/tag.validation.schema.js";
import { INewTagUseCase } from "../inew.tag.usecase.js";

export class NewTagUseCase implements INewTagUseCase {
    constructor(
        private readonly tags: ITagRepository,
    ) {

    }
    async execute(tagRequest: TagRequest, user: AuthenticatedUser): Promise<void> {
        const slug = tagRequest.tag.toLocaleLowerCase().split(' ').join('-')
        await this.tags.create({
            name: tagRequest.tag,
            slug
        })
    }

}