import { type Request, type Response, NextFunction } from "express";
import { INewPostUseCase } from "./usecases/inewPostUseCase.js";
import { AuthenticatedUser } from "../auth/auth.model.js";

export class SocialController {
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