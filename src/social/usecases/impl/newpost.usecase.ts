import { AuthenticatedUser } from "../../../auth/auth.model.js";
import { IUnitOfWork } from "../../../common/iunit-of-work.service.js";
import { NewMedia, NewMediaPost } from "../../../db/schema/social/schema.media.js";
import { NewPost } from "../../../db/schema/social/schema.post.js";
import { IPostRepository } from "../../repositories/ipost.repository.js";
import { IMediaStorageService } from "../../services/istorage.service.js";
import { PostRequest } from "../../validation/post.validation.schema.js";
import { INewPostUseCase } from "../inewPostUseCase.js";

export class NewPostUseCase implements INewPostUseCase {
    constructor(
        private readonly posts: IPostRepository,
        private readonly postUnitOfWork: IUnitOfWork,
        private readonly storageService: IMediaStorageService
    ) {

    }

    async execute(postRequest: PostRequest, user: AuthenticatedUser, files: any[]): Promise<void> {

        await this.postUnitOfWork.execute(async (repos) => {
            // store post
            console.log(user)
            const postId = await repos.post.create({ userId: user.id, ...postRequest } as NewPost)

            // upload media to storage
            const keys = []
            console.log(files)
            for (let file of files) {

                const parts = file.originalname.split('.')
                const ext = parts[parts.length - 1]
                const key = `${user.username}/${file.filename}.${ext}`
                keys.push(key)
                await this.storageService.upload(file.path, file.mimetype, key)

                const newMedia: NewMedia = {
                    userId: user.id,
                    url: key
                }

                const mediaId = await repos.media.create(newMedia)

                const newMediaPost: NewMediaPost = {
                    postId,
                    mediaId
                }

                await repos.mediaPost.create(newMediaPost)
            }

            // store tags if any
            console.log({ postId })
        })

    }

}