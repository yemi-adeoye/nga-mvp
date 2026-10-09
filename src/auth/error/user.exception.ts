import { compressDeflate } from "node:zlib/iter";
import { BaseException } from "./base.exception.js";

export class UserException extends BaseException {
    constructor(errorMessage: string, code: number) {
        super(errorMessage, code)
    }
}