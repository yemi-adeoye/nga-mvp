import { AuthenticatedUser } from "../../../../auth/auth.model.js";
import { IUnitOfWork } from "../../../../common/iunit-of-work.service.js";
import { NewMedia, NewMediaPost } from "../../../../db/schema/social/schema.media.js";
import { NewPost } from "../../../../db/schema/social/schema.post.js";
import { NewPostTag } from "../../../../db/schema/social/schema.tag.js";
import { MediaStorageException } from "../../../error/media.storage.exception.js";
import { IMediaStorageService } from "../../../services/istorage.service.js";
import { PostRequest } from "../../../validation/post.validation.schema.js";
import { INewPostUseCase } from "../inewPostUseCase.js";

export class NewPostUseCase implements INewPostUseCase {
    constructor(
        private readonly postUnitOfWork: IUnitOfWork,
        private readonly storageService: IMediaStorageService
    ) {

    }

    private async uploadFiles(user: AuthenticatedUser, files: any[]) {
        const mediaUrls = []
        try {
            for (let file of files) {

                const parts = file.originalname.split('.')
                const ext = parts[parts.length - 1]
                const key = `${user.username}/${file.filename}.${ext}`

                mediaUrls.push(key)

                await this.storageService.upload(file.path, file.mimetype, key)

            }
        } catch (error) {
            console.error(error)
            throw new MediaStorageException()
        }

        return mediaUrls
    }

    async execute(postRequest: PostRequest, user: AuthenticatedUser, files: any[]): Promise<void> {

        let urls: string[];
        if (files) {
            urls = await this.uploadFiles(user, files)
        }


        await this.postUnitOfWork.execute(async (repos) => {

            const postId = await repos.post.create({ userId: user.id, ...postRequest } as NewPost)

            if (files) {
                const newMedia: NewMedia[] = []

                urls.forEach(url => newMedia.push({ userId: user.id, url }))

                const mediaIds: number[] = await repos.media.createMany(newMedia)

                const mediaPostIds: NewMediaPost[] = []

                mediaIds.forEach((mediaId: number) => mediaPostIds.push({ postId, mediaId }))

                await repos.mediaPost.createMany(mediaPostIds)
            }

            if (postRequest.tags) {
                const postTags: NewPostTag[] = []
                postRequest.tags.forEach(tagId => postTags.push({ postId, tagId }))
                await repos.tagPost.createMany(postTags)
            }

        })

    }

}