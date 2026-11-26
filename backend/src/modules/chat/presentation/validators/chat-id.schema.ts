import { z } from "zod";

export const chatIdSchema = z.object({
  chatId: z.string().uuid("Invalid chat ID"),
});
