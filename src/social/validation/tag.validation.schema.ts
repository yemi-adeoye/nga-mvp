import { z } from "zod";

export const newTagSchema = z.object({
    tag: z.string(),
});

export type TagRequest = z.infer<typeof newTagSchema>;