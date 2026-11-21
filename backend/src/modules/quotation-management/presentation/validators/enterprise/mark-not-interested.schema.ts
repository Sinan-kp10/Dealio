import { z } from "zod";

export const markNotInterestedSchema = z.object({
  quotationId: z.string().uuid("Invalid quotation request ID format"),
});
