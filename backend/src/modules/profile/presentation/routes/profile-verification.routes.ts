import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware.js";
import { requireRole } from "../../../../app/middlewares/role.middleware.js";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware.js";
import { profileVerificationController } from "../../infrastructure/container/profile.container.js";
import { getPendingEnterprisesSchema } from "../validators/get-pending-enterprises.schema.js";
import { getEnterpriseApprovalDetailsSchema } from "../validators/get-enterprise-approval-details.schema.js";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("ADMIN"));

router.get(
    "/enterprises/pending",
    validateRequest(getPendingEnterprisesSchema, "query"),
    profileVerificationController.getPendingEnterprises
);

router.get("/enterprises/:enterpriseId/approval-details",validateRequest(getEnterpriseApprovalDetailsSchema, "params"),profileVerificationController.getEnterpriseApprovalDetails);

export default router;
