import { BaseException } from "../../auth/error/base.exception.js";

export class MediaStorageException extends BaseException {

    constructor() {
        super(
            `Unable to store media`,
            500
        );
    }
}