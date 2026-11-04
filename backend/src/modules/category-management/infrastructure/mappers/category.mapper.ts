import { Prisma } from "../../../../../generated/prisma/client";
import type { CategoryListItemDto, SubcategoryDto } from "../../application/dto/category-list.dto";

export const categorySelect = {
  id: true,
  name: true,
  status: true,
  subcategories: {
    select: {
      id: true,
      category_id: true,
      name: true,
      status: true,
    },
    orderBy: {
      created_at: "asc",
    },
  },
} satisfies Prisma.categoriesSelect;

export type CategoryRecord = Prisma.categoriesGetPayload<{ select: typeof categorySelect }>;

export class CategoryMapper {
  static toSubcategoryDto(subcategory: CategoryRecord["subcategories"][number]): SubcategoryDto {
    return {
      id: subcategory.id,
      categoryId: subcategory.category_id,
      name: subcategory.name,
      status: subcategory.status,
    };
  }

  static toDto(category: CategoryRecord): CategoryListItemDto {
    return {
      id: category.id,
      name: category.name,
      status: category.status,
      subcategories: category.subcategories?.map(CategoryMapper.toSubcategoryDto) ?? [],
    };
  }
}

