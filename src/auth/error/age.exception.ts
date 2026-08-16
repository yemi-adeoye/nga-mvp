import { BaseException } from "./base.exception.js";

export class UserIsNotOldEnoughException extends BaseException {
    constructor(dateOfBirthStr: string) {
        super(`User is not old enough, Date of birth supplied: ${dateOfBirthStr}`, 409)
    }
}