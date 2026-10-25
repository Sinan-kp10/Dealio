import { z } from "zod";

export const resendOtpSchema = z.object({
  email: z
    .email("Please provide a valid email address"),
    purpose: z.enum(["REGISTRATION", "PASSWORD_RESET"]),
    
});
