import { z } from "zod";

export const enterpriseAcceptedProposalListFilterSchema = z.object({
  search: z.string().trim().optional(),
  status: z.enum(["ALL", "ACCEPTED", "PAID", "COMPLETED"]).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(9),
});
