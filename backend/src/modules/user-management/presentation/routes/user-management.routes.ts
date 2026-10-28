import { Router } from "express";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware";
import { suspendAccountSchema } from "../validators/suspend-account.schema";
import { getCustomerSchema } from "../validators/get-customer.schema";
import { userManagementController } from "../../infrastructure/container/user-management.container";
import { getEnterpriseSchema } from "../validators/get-enterprise.schema";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../app/middlewares/role.middleware";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("ADMIN"));

router.get("/customers", validateRequest(getCustomerSchema, "query"), userManagementController.getUsers);
router.patch("/customers/:accountId/suspend", validateRequest(suspendAccountSchema), userManagementController.suspendAccount);
router.patch("/customers/:accountId/reactivate", userManagementController.reactivateAccount);

router.get("/enterprises", validateRequest(getEnterpriseSchema, "query"), userManagementController.getEnterprise);
router.patch("/enterprises/:accountId/suspend", validateRequest(suspendAccountSchema), userManagementController.suspendAccount);
router.patch("/enterprises/:accountId/reactivate", userManagementController.reactivateAccount);

export default router;
