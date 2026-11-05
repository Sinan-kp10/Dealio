import { Prisma } from "../../../../../generated/prisma/client";
import { SubCategoryDto } from "../../application/dto/sub-category.dto";


export const subCategorySelect = {
  id: true,
  category_id : true,
  name: true,
  status: true
} satisfies Prisma.subcategoriesSelect;

export type subCategoryRecord = Prisma.subcategoriesGetPayload<{ select: typeof subCategorySelect }>;

export class SubCategoryMapper {

    static toDto(subCategory: subCategoryRecord): SubCategoryDto {
        return {
            id: subCategory.id,
            categoryId : subCategory.category_id,
            name: subCategory.name,
            status: subCategory.status,
        };
    }
}

