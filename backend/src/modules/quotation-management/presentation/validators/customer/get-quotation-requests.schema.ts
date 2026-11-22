import { z } from "zod";

export const getQuotationRequestsSchema = z.object({
    search: z.string().trim().optional(),
    status: z.enum(["ALL", "PENDING", "PROPOSAL_RECEIVED", "ACCEPTED", "PAY_ADVANCE", "COMPLETED", "CANCELLED"]).optional(),
    categoryId: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(9),
});