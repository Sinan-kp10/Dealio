import { z } from "zod";

export const rejectEnterpriseKycSchema = z.object({
    reason: z
        .string()
        .trim()
        .min(2, "Rejection reason must be at least 2 characters")
        .max(1000, "Rejection reason cannot exceed 1000 characters"),
});
