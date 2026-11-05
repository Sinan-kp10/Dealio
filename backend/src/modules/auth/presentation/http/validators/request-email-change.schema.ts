import { z } from "zod";

export const requestEmailChangeSchema = z.object({
    newEmail: z.email("Enter a valid email address"),
});

export type RequestEmailChangeInput = z.infer<typeof requestEmailChangeSchema>;

