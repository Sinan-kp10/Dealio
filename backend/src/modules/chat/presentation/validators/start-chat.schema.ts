import { z } from "zod";

export const startChatSchema = z.object({
  targetId: z.string().uuid("Invalid target ID"),
});
