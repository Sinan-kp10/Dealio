import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.
      string().min(1, "Current password is required."),

    newPassword: z
      .string()
      .min(6, "Password must contain at least 6 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
