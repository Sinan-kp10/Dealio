import { Router } from "express";
import { quotationRequestController } from "../../../infrastructure/container/quotation.container";
import { customerProposalController } from "../../../infrastructure/container/proposal.container";
import { authMiddleware } from "../../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../../app/middlewares/role.middleware";
import { validateRequest } from "../../../../../app/middlewares/validate-request.middleware";
import { createQuotationRequestSchema } from "../../validators/customer/create-quotation-request.schema";
import { getQuotationRequestsSchema } from "../../validators/customer/get-quotation-requests.schema";
import { getQuotationRequestSchema } from "../../validators/customer/get-quotation-request-details.schema";
import { getReceivedProposalsSchema } from "../../validators/customer/get-received-proposals.schema";
import { getReceivedProposalDetailsSchema } from "../../validators/customer/get-received-proposal-details.schema";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("CUSTOMER"));

router.get("/", validateRequest(getQuotationRequestsSchema, "query"), quotationRequestController.getQuotationRequests);
router.get("/recent", quotationRequestController.getRecentQuotationRequests);
router.get("/:quotationId", validateRequest(getQuotationRequestSchema, "params"), quotationRequestController.getQuotationRequestDetails);
router.get("/:quotationId/proposals", validateRequest(getQuotationRequestSchema, "params"), validateRequest(getReceivedProposalsSchema, "query"), customerProposalController.getReceivedProposals);
router.get("/:quotationId/proposals/:proposalId", validateRequest(getReceivedProposalDetailsSchema, "params"), customerProposalController.getReceivedProposalDetails);
router.patch("/:quotationId/proposals/:proposalId/accept", validateRequest(getReceivedProposalDetailsSchema, "params"), customerProposalController.acceptReceivedProposal);
router.post("/", validateRequest(createQuotationRequestSchema), quotationRequestController.createQuotationRequest);
router.patch("/:quotationId", validateRequest(getQuotationRequestSchema, "params"), quotationRequestController.cancelQuotationRequest);

export default router;
