import express, { NextFunction, type Express, type Request, type Response } from 'express'
import { PORT } from './constants/constants.js'
import authRouter from './auth/auth.routes.js'
import { BaseException } from './auth/error/base.exception.js'

const app: Express = express()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use(express.json())
app.use('/auth', authRouter)
app.use(
    (
        err: unknown,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (err instanceof BaseException) {
            return res.status(err.statusCode).json({ msg: err.message })
        }

        console.error(err)

        return res.status(500).json({ msg: 'Internal Server Error' })
    }
)


app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})