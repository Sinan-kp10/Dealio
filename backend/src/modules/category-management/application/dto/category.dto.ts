import { CategoryStatus } from "./category-list.dto";

export interface CreateCategoryDto {
    categoryName : string
    status : CategoryStatus
}

export interface CategoryDto {
    id: string;
    name: string;
    status: CategoryStatus
}

export interface UpdateCategoryDto {
    id: string;
    categoryName?: string;
    status?: CategoryStatus
}

export interface UpdatedCategoryFieldsDto {
    categoryName?: string;
    status?: CategoryStatus
}

export interface ActiveSubCategoryDto {
    id: string;
    name: string;
}

export interface ActiveCategoryDto {
    id: string;
    name: string;
    subcategories?: ActiveSubCategoryDto[];
}

export type ActiveCategoryWithSubcategoriesDto = ActiveCategoryDto;
