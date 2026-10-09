import { z } from "zod";

export const postSchema = z.object({
    content: z.string().nullable(),
    repostId: z
        .string().optional()
        .transform(val => !val ? null : Number(val))
        .pipe(z.number().int().positive().nullable()),
    tags: z
        .union([
            z.string(),
            z.array(z.string()),
        ])
        .optional()
        .transform(val => {
            if (val === undefined || val === "") {
                return [];
            }

            const values = Array.isArray(val) ? val : [val];

            return values.map(Number);
        })
        .pipe(z.array(z.number().int().positive())),
});

export type PostRequest = z.infer<typeof postSchema>;