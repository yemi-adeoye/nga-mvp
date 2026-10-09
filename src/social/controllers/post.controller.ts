import { type Request, type Response, NextFunction } from "express";
import { AuthenticatedUser } from "../../auth/auth.model.js";
import { INewPostUseCase } from "../usecases/post/inewPostUseCase.js";

export class PostController {
    constructor(private readonly newPostUseCase: INewPostUseCase) {

    }
    newPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.newPostUseCase.execute(req.body, req.user as AuthenticatedUser, req.files)
            return res.status(200).json({ msg: 'New post created' })
        } catch (error) {
            next(error)
        }
    }
}