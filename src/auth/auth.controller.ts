import { type Response, type Request, NextFunction } from "express";
import { IRegisterUseCase } from "./usecases/iregisterUseCase.js";

export class AuthController {
    constructor(private readonly registerUseCase: IRegisterUseCase) { }

    register = async (req: Request, res: Response, next: NextFunction) => {

        try {
            await this.registerUseCase.execute(req.body)

            return res.status(201).json({ msg: "User successfully registered" })
        } catch (error) {
            next(error)
        }

    }
}