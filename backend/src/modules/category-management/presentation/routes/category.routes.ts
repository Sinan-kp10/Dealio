import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../app/middlewares/role.middleware";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware";
import { getCategoriesSchema } from "../validators/get-category.schema";
import { categoryController, subCategoryController } from "../../infrastructure/container/category.cantainer";
import { createCategorySchema } from "../validators/create-category.schema";
import { updateCategorySchema } from "../validators/updateCategory.schema";
import { createSubCategorySchema } from "../validators/create-sub-category.schema";
import { getSubCategoriesSchema } from "../validators/get-sub-category.schema";

const router = Router();

// Public active categories
router.get("/categories/active", categoryController.getActiveCategories);

router.use(authMiddleware);
router.use(requireRole("ADMIN"));
router.get("/categories", validateRequest(getCategoriesSchema, "query"), categoryController.getCategories);
router.post("/categories", validateRequest(createCategorySchema), categoryController.createCategory);
router.patch("/categories/:id", validateRequest(updateCategorySchema), categoryController.updateCategory);

router.get("/subcategories", validateRequest(getSubCategoriesSchema, "query"), subCategoryController.getSubCategories);
router.post("/subcategories", validateRequest(createSubCategorySchema), subCategoryController.createSubCategory);

export default router;
