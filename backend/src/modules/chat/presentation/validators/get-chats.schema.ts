import { z } from "zod";

export const getChatsSchema = z.object({
  filter: z.enum(["all", "unread"]).default("all"),
  search: z.string().trim().max(100).optional(),
  cursor: z.string().uuid("Invalid chat cursor").optional(),
});
