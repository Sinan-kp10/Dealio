import { z } from "zod";

export const getEnterpriseIdSchema = z.object({
  quotationId: z.string().uuid("Invalid quotation request ID format"),
});
