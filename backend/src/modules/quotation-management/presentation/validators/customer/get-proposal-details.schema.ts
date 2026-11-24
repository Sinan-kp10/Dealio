import { z } from "zod";

export const getProposalDetailsSchema = z.object({
    quotationId: z.string().uuid("Invalid quotation request ID format"),
    proposalId: z.string().uuid("Invalid proposal ID format"),
});
