export type SubCategoryStatus = "ACTIVE" | "INACTIVE";

export interface CreateSubCategoryInput {
    categoryId: string;
    subCategoryName: string;
    status: SubCategoryStatus;
}

export interface SubCategory {
    id: string;
    categoryId: string;
    name: string;
    status: SubCategoryStatus;
}

export interface SubCategoryListItem {
    id: string;
    categoryId: string;
    categoryName: string;
    name: string;
    status: SubCategoryStatus;
    updatedAt: string;
}

export interface SubCategoryListParams {
    search?: string;
    status?: SubCategoryStatus;
    categoryId?: string;
    page: number;
    limit: number;
}

export interface PaginatedSubCategory {
    items: SubCategoryListItem[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface SubCategoryListResponse {
    status: boolean;
    message: string;
    data: PaginatedSubCategory;
}

export interface CreateSubCategoryResponse {
    status: boolean;
    message: string;
    data: SubCategory;
}
