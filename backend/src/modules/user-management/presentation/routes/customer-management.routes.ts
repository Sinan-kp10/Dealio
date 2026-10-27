import { Router } from "express";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware";
import { suspendAccountSchema } from "../validators/suspend-account.schema";
import { getCustomerSchema } from "../validators/get-customer.schema";
import { customerManagementController } from "../../infrastructure/container/customer-management.container";
const router = Router();

router.get("/",validateRequest(getCustomerSchema, "query"),customerManagementController.getUsers)
router.patch("/:accountId/suspend",validateRequest(suspendAccountSchema),customerManagementController.suspendAccount)
router.patch("/:accountId/reactivate", customerManagementController.reactivateAccount)



export default router