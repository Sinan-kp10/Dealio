import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../app/middlewares/role.middleware";
import { enterpriseProfileController } from "../../infrastructure/container/profile.container";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware";
import { UpdateEnterpriseDetailsSchema } from "../validators/update-enterprise-details.schema";

const router = Router();

router.use(authMiddleware)
router.use(requireRole("ENTERPRISE_MANAGER"))
router.get("/profile", enterpriseProfileController.getProfile)
router.patch("/profile", validateRequest(UpdateEnterpriseDetailsSchema), enterpriseProfileController.updateDetails)
router.get("/categories", enterpriseProfileController.getCategories)

export default router