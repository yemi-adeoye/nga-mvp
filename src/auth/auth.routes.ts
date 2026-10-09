import { Router, type Request, type Response } from "express";
import { createAuthController } from "../bootstrap.js";
import { verifyEmail } from "./middlewares/email-token.validation.js";
import { validateRequestBody } from "./middlewares/request-body.validation.js";
import { registerSchema } from "./validation/register.schema.js";
import { verifySchema } from "./validation/verify-email.schema.js";
import { loginSchema } from "./validation/login.schema.js";

const authRouter: Router = Router()

const authController = createAuthController();

authRouter.post("/register", validateRequestBody(registerSchema), authController.register)
authRouter.get("/verify", verifyEmail(verifySchema), authController.verify)
authRouter.post("/login", validateRequestBody(loginSchema), authController.login)
authRouter.get("/refresh", authController.refresh)

export default authRouter