import type { CategoryStatus } from "./category.types";

export interface UpdateCategoryInput {
    categoryName?: string;
    status?: CategoryStatus;
}

export interface UpdateCategoryData {
    id: string;
    name: string;
    status: CategoryStatus;
}

export interface UpdateCategoryResponse {
    status: boolean;
    message: string;
    data: UpdateCategoryData;
}

