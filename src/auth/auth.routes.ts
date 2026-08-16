import { Router, type Request, type Response } from "express";
import { createAuthController } from "../bootstrap.js";
import { validate } from "./middlewares/auth.validation.js";
import { registerSchema } from "./validation/register.schema.js";

const authRouter: Router = Router()

const authController = createAuthController();

authRouter.post("/register", validate(registerSchema), authController.register)

authRouter.post("/login", async (req: Request, res: Response) => {


})

export default authRouter