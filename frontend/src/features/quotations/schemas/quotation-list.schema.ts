import { z } from "zod";

export const quotationListFilterSchema = z.object({
    search: z.string().optional(),
    status: z
        .enum(["ALL", "PENDING", "PROPOSAL_RECEIVED", "ACCEPTED", "COMPLETED", "CANCELLED"])
        .optional(),
    categoryId: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(50).default(9),
});