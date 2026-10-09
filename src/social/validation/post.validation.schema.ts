import { z } from "zod";

export const postSchema = z.object({
    content: z.string().nullable(),
    repostId: z
        .string().optional()
        .transform(val => !val ? null : Number(val))
        .pipe(z.number().int().positive().nullable()),
});

export type PostRequest = z.infer<typeof postSchema>;