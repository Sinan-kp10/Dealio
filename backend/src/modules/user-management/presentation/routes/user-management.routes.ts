import { Router } from "express";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware";
import { getUsersSchema } from "../validators/get-users.schema";
import { userManagementController } from "../../infrastructure/container/user-management.container";
const router = Router();

router.get("/",validateRequest(getUsersSchema),userManagementController.getUsers)

export default router