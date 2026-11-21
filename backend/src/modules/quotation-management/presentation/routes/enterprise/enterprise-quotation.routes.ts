import { Router } from "express";
import { enterpriseQuotationController } from "../../../infrastructure/container/quotation.container";
import { authMiddleware } from "../../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../../app/middlewares/role.middleware";
import { validateRequest } from "../../../../../app/middlewares/validate-request.middleware";
import { getEnterpriseQuotationsSchema } from "../../validators/enterprise/get-enterprise-quotations.schema";
import { markNotInterestedSchema } from "../../validators/enterprise/mark-not-interested.schema";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("ENTERPRISE_MANAGER"));

router.get("/", validateRequest(getEnterpriseQuotationsSchema, "query"), enterpriseQuotationController.getAvailableQuotations);
router.post("/:quotationId/not-interested", validateRequest(markNotInterestedSchema, "params"), enterpriseQuotationController.markNotInterested);

export default router;
