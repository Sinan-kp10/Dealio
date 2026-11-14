import { z } from "zod";

export const notificationIdSchema = z.object({
    notificationId: z.string().uuid("Invalid notification ID format"),
});