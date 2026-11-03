import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../app/middlewares/role.middleware";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware";
import { getCategoriesSchema } from "../validators/get-category.schema";
import { categoryController } from "../../infrastructure/container/category.caontainer";
import { createCategorySchema } from "../validators/create-category.schema";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("ADMIN"))
router.get("/categories", validateRequest(getCategoriesSchema, "query"), categoryController.getCategories)
router.post("/categories", validateRequest(createCategorySchema,), categoryController.createCategory)


export default router