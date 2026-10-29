import { Router } from "express";
import { customerProfileController } from "../../infrastructure/container/profile.container";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../app/middlewares/role.middleware";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware";
import { editCustomerProfileSchema } from "../validators/edit-customer-profile.schema";

const router = Router();

router.use(authMiddleware)
router.use(requireRole("CUSTOMER"))
router.get("/profile", customerProfileController.getProfile)
router.patch("/profile/edit", validateRequest(editCustomerProfileSchema), customerProfileController.editProfile)

export default router