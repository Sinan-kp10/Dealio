import { z } from "zod";

export const proposalIdSchema = z.object({
    proposalId: z.string().uuid("Invalid proposal ID format"),
});
