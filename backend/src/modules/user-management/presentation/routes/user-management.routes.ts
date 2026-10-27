import { Router } from "express";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware";
import { getUsersSchema } from "../validators/get-users.schema";
import { userManagementController } from "../../infrastructure/container/user-management.container";
import { suspendAccountSchema } from "../validators/suspend-account.schema";
const router = Router();

router.get("/",validateRequest(getUsersSchema, "query"),userManagementController.getUsers)
router.patch("/:accountId/suspend",validateRequest(suspendAccountSchema),userManagementController.suspendAccount)
router.patch("/:accountId/reactivate", userManagementController.reactivateAccount)



export default router