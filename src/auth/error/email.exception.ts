import { BaseException } from "./base.exception.js";

export class EmailAlreadyExistsException extends BaseException {

    constructor(email: string) {
        super(
            `Email '${email}' is already registered.`,
            409
        );
    }
}