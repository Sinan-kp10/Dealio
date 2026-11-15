import { Prisma } from "../../../../../generated/prisma/client";
import { SubCategoryDto, SubCategoryListItemDto } from "../../application/dto/sub-category.dto";

export const subCategorySelect = {
  id: true,
  category_id : true,
  name: true,
  status: true
} satisfies Prisma.subcategoriesSelect;

export type subCategoryRecord = Prisma.subcategoriesGetPayload<{ select: typeof subCategorySelect }>;

export const subCategoryListSelect = {
  id: true,
  category_id : true,
  name: true,
  status: true,
  updated_at: true,
  category: {
    select: {
      id: true,
      name: true,
    },
  },
} satisfies Prisma.subcategoriesSelect;

export type subCategoryListRecord = Prisma.subcategoriesGetPayload<{ select: typeof subCategoryListSelect }>;

export class SubCategoryMapper {

  static toDto(subCategory: subCategoryRecord): SubCategoryDto {
    return {
      id: subCategory.id,
      categoryId : subCategory.category_id,
      name: subCategory.name,
      status: subCategory.status,
    };
  }

  static toListItemDto(subCategory: subCategoryListRecord): SubCategoryListItemDto {
    return {
      id: subCategory.id,
      categoryId: subCategory.category_id,
      categoryName: subCategory.category.name,
      name: subCategory.name,
      status: subCategory.status,
      updatedAt: subCategory.updated_at,
    };
  }
}
