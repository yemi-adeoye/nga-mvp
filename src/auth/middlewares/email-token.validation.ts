import { NextFunction, type Request, type Response } from "express"
import z from "zod"
export const verifyEmail = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const result = schema.safeParse(req.query)

        if (!result.success) {
            return res.status(400).json(result.error)
        }

        res.locals.token = result.data

        next()
    }

}