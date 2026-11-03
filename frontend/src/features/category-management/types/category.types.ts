export type CategoryStatus = "ACTIVE" | "INACTIVE"

export interface Subcategory {
    id: string;
    categoryId: string;
    name: string;
    status: CategoryStatus
}

export interface Category {
    id: string;
    name: string;
    status: CategoryStatus
    subcategories: Subcategory[];
}

export interface CategoryListParams {
    search?: string;
    status?: CategoryStatus
    page: number;
    limit: number;
}

export interface PaginatedCategory {
    items: Category[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface CategoryListResponse {
  status: boolean;
  message: string;
  data: PaginatedCategory;
}