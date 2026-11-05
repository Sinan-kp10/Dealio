import { z } from "zod";

export const getSubCategoriesSchema = z.object({
  search: z.string().optional(),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional().or(z.literal("")),

  categoryId: z.string().uuid("Invalid category ID").optional().or(z.literal("")),

  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),
});
