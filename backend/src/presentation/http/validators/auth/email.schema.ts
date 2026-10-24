import { z } from "zod";

export const emailSchema = z.object({
    email: z.email("Please provide a valid email address.")
});