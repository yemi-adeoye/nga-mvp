import { BaseException } from "./base.exception.js";

export class PhoneAlreadyExistsException extends BaseException {

    constructor(phone: string) {
        super(
            `Phone '${phone}' is already registered.`,
            409
        );
    }
}