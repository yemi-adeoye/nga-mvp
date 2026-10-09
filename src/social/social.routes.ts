import { Router } from "express";
import { createSocialController } from "../bootstrap.js";
import { isAuthenticated } from "../auth/middlewares/user.validation.js";
import { validateRequestBody } from "../auth/middlewares/request-body.validation.js";
import { postSchema } from "./validation/post.validation.schema.js";
import { upload } from "./middlewares/upload.files.js";
import { MAX_POST_UPLOAD } from "./constants/constants.js";

const socialRouter: Router = Router()

const socialController = createSocialController()

socialRouter.post(
    '/post',
    isAuthenticated,
    upload.array("media", MAX_POST_UPLOAD),
    validateRequestBody(postSchema),
    socialController.newPost)
socialRouter.get('/post', isAuthenticated, socialController.newPost)
socialRouter.put('/post', isAuthenticated, socialController.newPost)
socialRouter.delete('/post', isAuthenticated, socialController.newPost)

export default socialRouter