import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware";
import validateProfilePicture from "../../../../app/middlewares/validate-image.middleware";
import { updateProfilePictureController } from "../../infrastructure/container/profile.container";

const router = Router();

router.use(authMiddleware);

router.put("/picture",validateProfilePicture,updateProfilePictureController.updateProfilePicture)

export default router;
