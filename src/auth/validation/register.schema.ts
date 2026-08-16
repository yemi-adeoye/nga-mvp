import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    username: z.string().min(3).max(50).regex(/[A-Za-z0-9_]+$/),
    email: z.email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."),
    phone: z.string().regex(/^\+[1-9]\d{1,14}$/).optional(),
    dateOfBirth: z.coerce.date(),
});

export type RegisterRequest = z.infer<typeof registerSchema>;