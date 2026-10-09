import { type Request, type Response, NextFunction } from "express";
import { ILoginUseCase } from "./usecases/iloginUseCase.js";
import { IRegisterUseCase } from "./usecases/iregisterUseCase.js";
import { IVerifyUseCase } from "./usecases/iverifyUseCase.js";
import { ISessionUseCase } from "./usecases/isessionUseCase.js";

export class AuthController {
    constructor(
        private readonly registerUseCase: IRegisterUseCase,
        private readonly verifyUseCase: IVerifyUseCase,
        private readonly loginUseCase: ILoginUseCase,
        private readonly sessionUseCase: ISessionUseCase
    ) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.registerUseCase.execute(req.body)
            return res.status(201).json({ msg: "User successfully registered" })
        } catch (error) {
            next(error)
        }

    }

    verify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token } = res.locals.token
            await this.verifyUseCase.execute({ token: token as string })
            return res.status(200).json({ msg: "Email verified successfully" })
        } catch (error) {
            next(error)
        }

    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = await this.loginUseCase.execute(req.body)
            const userAgent = req.get('User-Agent');
            const ipAddress = req.ip;

            const userInfo = { identifier: userId, userAgent, ipAddress }
            const session = await this.sessionUseCase.createSession(userInfo)

            // TODO fix this cookie to secure for production
            res.cookie('refresh_token', session.refreshToken, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 30 * 24 * 60 * 60 * 1000 })
            return res.status(200).json({ access_token: session.accessToken })
        } catch (error) {
            next(error)
        }

    }

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken: string | undefined = req.cookies.refresh_token

        if (!(refreshToken?.length)) {
            return res.status(401).json({ msg: 'Unauthorized' })
        }

        try {
            const accessToken = await this.sessionUseCase.refreshToken(refreshToken)

            return res.status(200).json({ access_token: accessToken })
        } catch (error) {
            next(error)
        }



    }


}