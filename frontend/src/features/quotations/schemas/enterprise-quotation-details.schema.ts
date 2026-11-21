import { z } from "zod";

export const enterpriseQuotationDetailsParamsSchema = z.object({
  id: z.string().trim().min(1, "Quotation ID is required"),
});

