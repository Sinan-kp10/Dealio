import { z } from "zod";

export const resetPasswordSchema = z
    .object({
        resetToken: z
            .string()
            .min(1, "Reset token is required."),

        newPassword: z
            .string()
            .min(6, "Password must be at least 6 characters.")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter."),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password."),
    })
    .refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        },
    );

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;