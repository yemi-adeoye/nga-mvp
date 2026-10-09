import express, { NextFunction, type Express, type Request, type Response } from 'express'
import { PORT } from './constants/constants.js'
import authRouter from './auth/auth.routes.js'
import { BaseException } from './auth/error/base.exception.js'
import cors from 'cors';
import 'dotenv/config'
import cookieParser from "cookie-parser";
import postRouter from './social/routes/post.routes.js';
import multer from 'multer';
import tagRouter from './social/routes/tag.routes.js';
import feedRouter from './social/routes/feed.routes.js';


const app: Express = express()

const ALLOWED_ORIGINS = [
    "http://192.168.40.25:4200",
    "http://192.168.40.146:4200",
    'http://localhost:4200'
]

app.use(cors({
    origin: ALLOWED_ORIGINS,
    credentials: true
}))

app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
app.use((req, _res, next) => {
    console.log("HTTP:", req.method, req.originalUrl);
    next();
});
app.use(express.json())
app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/tag', tagRouter)
app.use('/feed', feedRouter)

app.use(
    (
        err: unknown,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        console.log({ err })
        if (err instanceof BaseException) {
            return res.status(err.statusCode).json({ msg: err.message })
        }

        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(413).json({
                    message: "File is too large. Maximum size is 10 MB."
                });
            }

            if (err.code === "LIMIT_FILE_COUNT") {
                return res.status(400).json({
                    message: "Too many files."
                });
            }
        }

        return res.status(500).json({ msg: 'Internal Server Error' })
    }
)


app.listen(PORT, '0.0.0.0', () => {
    console.log(`app running on port ${PORT}`)
})