import { IFeedRepository } from "../../../repositories/ifeed.repository.js";
import { IFeedUseCase } from "../ifeed.usecase.js";

export class FeedUseCase implements IFeedUseCase {
    constructor(private readonly feedRepository: IFeedRepository) {

    }

    async execute(postId: number) {
        return this.feedRepository.getFeedByPostId(postId)
    }
}