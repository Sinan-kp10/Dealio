import { z } from "zod";

export const ForgottenPasswordSchema = z.object({

    email: z.email("Enter a valid email address")
})
