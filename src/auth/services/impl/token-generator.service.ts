import {
    createHash,
    randomBytes
} from "node:crypto";
import { ITokenGenerator } from "../itoken-generator.service.js";

export class CryptoTokenGenerator implements ITokenGenerator {

    generate(): string {
        return randomBytes(32).toString("hex");
    }

    hash(token: string): string {
        return createHash("sha256")
            .update(token)
            .digest("hex");
    }
}