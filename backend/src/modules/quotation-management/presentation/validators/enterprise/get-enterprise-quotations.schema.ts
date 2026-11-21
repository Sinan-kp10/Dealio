import { z } from "zod";

export const getEnterpriseQuotationsSchema = z.object({
  search: z.string().trim().optional(),
  subcategoryId: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(9),
});
