import { Router } from "express";
import { validateRequestBody } from "../../auth/middlewares/request-body.validation.js";
import { isAuthenticated } from "../../auth/middlewares/user.validation.js";
import { createFeedController, createPostController } from "../../bootstrap.js";
import { MAX_POST_UPLOAD } from "../constants/constants.js";
import { upload } from "../middlewares/upload.files.js";
import { postSchema } from "../validation/post.validation.schema.js";

const feedRouter: Router = Router()

const feedController = createFeedController()

feedRouter.get('/:postId', isAuthenticated, feedController.feedById)


export default feedRouter