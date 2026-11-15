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

export interface ActiveCategoryDto {
    id: string;
    name: string;
}
