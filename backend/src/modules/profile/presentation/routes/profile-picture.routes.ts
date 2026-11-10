import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware";
import validateProfilePicture from "../../../../app/middlewares/validate-image.middleware";
import { profilePictureController } from "../../infrastructure/container/profile.container";

const router = Router();

router.use(authMiddleware);

router.put("/picture",validateProfilePicture,profilePictureController.updateProfilePicture)
router.delete("/picture", profilePictureController.removeProfilePicture)

export default router;
