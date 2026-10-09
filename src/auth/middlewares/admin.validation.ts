import { AuthenticatedUser } from "../auth.model.js";
import { NextFunction, type Request, type Response } from "express"
import { LoginException } from "../error/login.exception.js";
import { ACTIVE, ADMIN } from "../../constants/constants.js";
import { UserException } from "../error/user.exception.js";


export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new UserException('Unauthenticated user', 401)
    }

    if (req.user.status != ACTIVE) {
        throw new UserException('Inactive', 401)
    }

    if (req.user.role != ADMIN) {
        throw new UserException('Not permitted', 403)
    }

    next()
}