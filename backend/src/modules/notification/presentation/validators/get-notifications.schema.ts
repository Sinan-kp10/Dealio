import { z } from "zod";

export const getNotificationsSchema = z.object({
    isRead: z.enum(["true", "false"]).optional(),
    cursor: z.string().uuid("Invalid notification cursor").optional(),
    limit: z.coerce.number().int().min(1).max(100).default(5),
});