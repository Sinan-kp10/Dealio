import { Router } from "express";
import { customerProfileController } from "../../infrastructure/container/profile.container.js";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware.js";
import { requireRole } from "../../../../app/middlewares/role.middleware.js";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware.js";
import { UpdateCustomerProfileSchema } from "../validators/update-customer-profile.schema.js";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("CUSTOMER"));
router.get("/profile", customerProfileController.getProfile);
router.patch("/profile", validateRequest(UpdateCustomerProfileSchema), customerProfileController.updateProfile);

export default router;
