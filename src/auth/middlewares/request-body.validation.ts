import { NextFunction, type Request, type Response } from "express"
import z from "zod"
export const validateRequestBody = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(req.files)
        const result = schema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json(result.error)
        }

        req.body = result.data

        next()
    }

}