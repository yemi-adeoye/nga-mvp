import { BaseException } from "./base.exception.js";

export class LoginException extends BaseException {
    constructor(errorMessage: string) {
        super(errorMessage, 401)
    }
}