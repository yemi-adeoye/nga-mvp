import { Router } from "express";
import { validateRequestBody } from "../../auth/middlewares/request-body.validation.js";
import { isAuthenticated } from "../../auth/middlewares/user.validation.js";
import { createPostController } from "../../bootstrap.js";
import { MAX_POST_UPLOAD } from "../constants/constants.js";
import { upload } from "../middlewares/upload.files.js";
import { postSchema } from "../validation/post.validation.schema.js";

const postRouter: Router = Router()

const socialController = createPostController()

postRouter.post(
    '/',
    isAuthenticated,
    upload.array("media", MAX_POST_UPLOAD),
    validateRequestBody(postSchema),
    socialController.newPost)
postRouter.get('/', isAuthenticated, socialController.newPost)
postRouter.put('/', isAuthenticated, socialController.newPost)
postRouter.delete('/', isAuthenticated, socialController.newPost)


export default postRouter