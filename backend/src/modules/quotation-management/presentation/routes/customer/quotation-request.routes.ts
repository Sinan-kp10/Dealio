import { Router } from "express";
import { quotationRequestController } from "../../../infrastructure/container/quotation.container";
import { authMiddleware } from "../../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../../app/middlewares/role.middleware";
import { validateRequest } from "../../../../../app/middlewares/validate-request.middleware";
import { createQuotationRequestSchema } from "../../validators/customer/create-quotation-request.schema";
import { getQuotationRequestsSchema } from "../../validators/customer/get-quotation-requests.schema";
import { getQuotationRequestDetailsSchema } from "../../validators/customer/get-quotation-request-details.schema";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("CUSTOMER"));

router.get("/", validateRequest(getQuotationRequestsSchema, "query"), quotationRequestController.getQuotationRequests);
router.get("/:quotationId", validateRequest(getQuotationRequestDetailsSchema, "params"), quotationRequestController.getQuotationRequestDetails);
router.post("/", validateRequest(createQuotationRequestSchema), quotationRequestController.createQuotationRequest);

export default router;
