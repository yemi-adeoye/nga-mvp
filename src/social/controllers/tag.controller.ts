import { type Request, type Response, NextFunction } from "express";
import { AuthenticatedUser } from "../../auth/auth.model.js";
import { INewTagUseCase } from "../usecases/tag/inew.tag.usecase.js";

export class TagController {
    constructor(private readonly newTagUseCase: INewTagUseCase) {

    }
    newTag = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.newTagUseCase.execute(req.body, req.user as AuthenticatedUser)
            return res.status(200).json({ msg: 'New tag created' })
        } catch (error) {
            next(error)
        }
    }
}