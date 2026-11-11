import { z } from "zod";

export const getEnterpriseApprovalDetailsSchema = z.object({
    enterpriseId: z.string().uuid("Invalid enterprise ID format"),
});
