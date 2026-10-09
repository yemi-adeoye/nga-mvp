import { z } from "zod";

export const verifySchema = z.object({
    token: z.string().length(64).regex(
        /^[a-f0-9]+$/,
        "Invalid verification token"
    )
});

export type VerificationValidationToken = z.infer<typeof verifySchema>;