import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(3).max(50).regex(/[A-Za-z0-9_]+$/, "Invalid username"),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."),
});

export type LoginRequest = z.infer<typeof loginSchema>;