import { BaseException } from "./base.exception.js";

export class EmailVerificationException extends BaseException {

    constructor(message: string) {
        super(
            message,
            400
        );
    }
}