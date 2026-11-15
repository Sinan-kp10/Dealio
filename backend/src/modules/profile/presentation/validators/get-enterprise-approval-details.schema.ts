import { z } from "zod";

export const getEnterpriseIdSchema = z.object({
    enterpriseId: z.string().uuid("Invalid enterprise ID format"),
});
