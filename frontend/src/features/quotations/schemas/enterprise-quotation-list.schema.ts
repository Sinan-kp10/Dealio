import { z } from "zod";

export const enterpriseQuotationListFilterSchema = z.object({
  search: z.string().trim().optional(),
  status: z.enum(["ALL", "OPEN", "PROPOSAL_SENT", "CLOSED", "CANCELLED"]).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(9),
});
