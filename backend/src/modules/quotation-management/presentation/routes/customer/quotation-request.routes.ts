import { Router } from "express";
import { quotationRequestController } from "../../../infrastructure/container/quotation.container";
import { authMiddleware } from "../../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../../app/middlewares/role.middleware";
import { validateRequest } from "../../../../../app/middlewares/validate-request.middleware";
import { createQuotationRequestSchema } from "../../validators/customer/create-quotation-request.schema";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("CUSTOMER"));

router.post("/", validateRequest(createQuotationRequestSchema), quotationRequestController.createQuotationRequest);

export default router;
