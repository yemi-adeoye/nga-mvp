import { NextFunction, type Request, type Response } from "express"
import { LoginException } from "../error/login.exception.js"
import { userRepository } from "../../bootstrap.js"
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    let authToken = req.headers.authorization

    if (!authToken || !authToken.startsWith("Bearer ")) {
        throw new LoginException('user is not authenticated!')
    }


    authToken = authToken?.substring("Bearer ".length)

    let user;

    try {
        const payload = jwt.verify(authToken, process.env.NGS_SECRET!)

        const userId = Number(payload.sub);

        user = await userRepository.findById(userId)

    } catch (error) {
        console.error(error)
        throw new LoginException('user is not authenticated!')
    }

    if (!user || user.status !== 'active') {
        throw new LoginException('user is not authenticated!')
    }

    req.user = { id: user.id, username: user.username, status: user.status, role: user.role }

    next()
}