import { z } from "zod";

export const getQuotationRequestSchema = z.object({
    quotationId: z.string().uuid("Invalid quotation request ID format"),
});