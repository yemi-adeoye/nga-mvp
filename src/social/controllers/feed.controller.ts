import { type Request, type Response, NextFunction } from "express";
import { AuthenticatedUser } from "../../auth/auth.model.js";
import { IFeedUseCase } from "../usecases/feed/ifeed.usecase.js";

export class FeedController {
    constructor(private readonly feedUseCase: IFeedUseCase) {

    }

    feedById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = Number(req.params.postId)
            console.log({ postId })
            const feed = await this.feedUseCase.execute(postId)
            return res.status(200).json({ feed })
        } catch (error) {
            next(error)
        }
    }
}