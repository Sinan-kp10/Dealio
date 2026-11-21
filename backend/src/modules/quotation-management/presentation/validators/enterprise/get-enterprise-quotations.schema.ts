import { z } from "zod";

export const getEnterpriseQuotationsSchema = z.object({
  search: z.string().trim().optional(),
  status: z.enum(["ALL", "OPEN", "PROPOSAL_SENT", "CLOSED", "CANCELLED"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(9),
});
