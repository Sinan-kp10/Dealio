import { Router } from "express";
import { customerProfileController } from "../../infrastructure/container/profile.container";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware";

const customerProfileRouter = Router();


customerProfileRouter.get("/profile",authMiddleware,customerProfileController.getProfile)

export default customerProfileRouter