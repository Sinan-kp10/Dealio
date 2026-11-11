import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware.js";
import { requireRole } from "../../../../app/middlewares/role.middleware.js";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware.js";
import { profileVerificationController } from "../../infrastructure/container/profile.container.js";
import { getPendingEnterprisesSchema } from "../validators/get-pending-enterprises.schema.js";
import { getEnterpriseIdSchema } from "../validators/get-enterprise-approval-details.schema.js";
import { rejectVerificationSchema } from "../validators/reject-enterprise-kyc.schema.js";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("ADMIN"));

router.get("/pending",validateRequest(getPendingEnterprisesSchema, "query"),profileVerificationController.getPendingEnterprises);
router.get("/:enterpriseId/approval-details",validateRequest(getEnterpriseIdSchema, "params"),profileVerificationController.getEnterpriseApprovalDetails);
router.post("/:enterpriseId/kyc/verify", validateRequest(getEnterpriseIdSchema, "params"), profileVerificationController.verifyEnterpriseKyc)
router.post("/:enterpriseId/kyc/reject", validateRequest(getEnterpriseIdSchema, "params"), validateRequest(rejectVerificationSchema, "body"), profileVerificationController.rejectEnterpriseKyc);
router.post("/:enterpriseId/bank/reject", validateRequest(getEnterpriseIdSchema, "params"), validateRequest(rejectVerificationSchema, "body"), profileVerificationController.rejectEnterpriseBankRecord);

export default router;
