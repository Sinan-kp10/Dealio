import { Router } from "express";
import { enterpriseQuotationController } from "../../../infrastructure/container/quotation.container";
import { authMiddleware } from "../../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../../app/middlewares/role.middleware";
import { validateRequest } from "../../../../../app/middlewares/validate-request.middleware";
import { getEnterpriseQuotationsSchema } from "../../validators/enterprise/get-enterprise-quotations.schema";
import { getEnterpriseIdSchema } from "../../validators/enterprise/get-enterprise-id.schema";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("ENTERPRISE_MANAGER"));

router.get("/", validateRequest(getEnterpriseQuotationsSchema, "query"), enterpriseQuotationController.getAvailableQuotations);
router.get("/:quotationId", validateRequest(getEnterpriseIdSchema, "params"), enterpriseQuotationController.getQuotationDetails);
router.post("/:quotationId/not-interested", validateRequest(getEnterpriseIdSchema, "params"), enterpriseQuotationController.markNotInterested);

export default router;
