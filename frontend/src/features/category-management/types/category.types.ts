export type CategoryStatus = "ACTIVE" | "INACTIVE";

export interface Category {
    id: string;
    name: string;
    status: CategoryStatus;
    subcategoriesCount: number;
    updatedAt: string;
}

export interface CategoryListParams {
    search?: string;
    status?: CategoryStatus;
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
  success: boolean;
  message: string;
  data: PaginatedCategory;
}
