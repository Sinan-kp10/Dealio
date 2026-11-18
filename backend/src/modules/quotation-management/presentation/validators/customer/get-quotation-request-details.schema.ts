import { z } from "zod";

export const getQuotationRequestDetailsSchema = z.object({
    quotationId: z.string().uuid("Invalid quotation request ID format"),
});