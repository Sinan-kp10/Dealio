import type { CategoryStatus } from "./category.types";

export interface CreateCategoryInput {
    categoryName: string;
    status: CategoryStatus;
}

export interface CreateCategoryData {
    id: string;
    name: string;
    status: CategoryStatus
}

export interface CreateCategoryResponse {
    success : string;
    message : string;
    data : CreateCategoryData
}