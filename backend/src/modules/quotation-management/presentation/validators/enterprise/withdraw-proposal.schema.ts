import { z } from "zod";

export const withdrawProposalSchema = z.object({
    proposalId: z.string().uuid("Invalid proposal ID format"),
});
