import { AuthenticatedUser } from "../auth/auth.model.ts";
import type { UserStatus } from "../db/schema/users.js";

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

export { };