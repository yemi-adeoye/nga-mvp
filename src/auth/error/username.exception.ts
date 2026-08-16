import { BaseException } from "./base.exception.js";

export class UsernameAlreadyExistsException extends BaseException {

    constructor(username: string) {
        super(
            `Username '${username}' is already registered.`,
            409
        );
    }
}