import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../app/middlewares/role.middleware";
import { enterpriseProfileController } from "../../infrastructure/container/profile.container";

const router = Router();

router.use(authMiddleware)
router.use(requireRole("ENTERPRISE_MANAGER"))
router.get("/profile", enterpriseProfileController.getProfile)

export default router