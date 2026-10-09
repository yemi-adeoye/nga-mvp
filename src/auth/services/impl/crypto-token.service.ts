import { createHash, randomBytes } from "crypto";
import { ITokenGenerator } from "../itoken-generator.service.js";
import { ITokenHasher } from "../itoken-hasher.service.js";

export class CryptoTokenService implements ITokenGenerator, ITokenHasher {
    hash(token: string): string {
        return createHash("sha256")
            .update(token)
            .digest("hex");
    }

    generate(): string {
        return randomBytes(32).toString("hex");
    }
}