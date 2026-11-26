import { z } from "zod";

export const getMessagesSchema = z.object({
  cursor: z.string().uuid("Invalid message cursor").optional(),
});
