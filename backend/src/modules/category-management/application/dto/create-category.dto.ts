import { CategoryStatus } from "./category.dto";

export interface CreateCategoryDto {
    categoryName : string
    status : CategoryStatus
}

export interface CategoryDto {
    id: string;
    name: string;
    status: CategoryStatus
}