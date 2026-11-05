import { Prisma } from "../../../../../generated/prisma/client";
import type { CategoryListItemDto } from "../../application/dto/category-list.dto";

export const categorySelect = {
  id: true,
  name: true,
  status: true,
  updated_at: true,
  _count: {
    select: {
      subcategories: true,
    },
  },
} satisfies Prisma.categoriesSelect;

export type CategoryRecord = Prisma.categoriesGetPayload<{ select: typeof categorySelect }>;

export class CategoryMapper {
  static toDto(category: CategoryRecord): CategoryListItemDto {
    return {
      id: category.id,
      name: category.name,
      status: category.status,
      subcategoriesCount: category._count?.subcategories ?? 0,
      updatedAt: category.updated_at,
    };
  }
}
