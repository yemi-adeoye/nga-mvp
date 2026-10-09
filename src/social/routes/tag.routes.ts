import { Router } from "express";
import { isAuthenticated } from "../../auth/middlewares/user.validation.js";
import { isAdmin } from "../../auth/middlewares/admin.validation.js";
import { createTagController } from "../../bootstrap.js";
import { validateRequestBody } from "../../auth/middlewares/request-body.validation.js";
import { newTagSchema } from "../validation/tag.validation.schema.js";

const tagRouter: Router = Router()
const tagController = createTagController()


// tag routes
tagRouter.post('/', validateRequestBody(newTagSchema), isAuthenticated, isAdmin, tagController.newTag)

export default tagRouter