export type CategoryStatus = "ACTIVE" | "INACTIVE";

export interface SubcategoryDto {
    id: string;
    categoryId: string;
    name: string;
    status: CategoryStatus
}

export interface CategoryListItemDto {
    id: string;
    name: string;
    status: CategoryStatus
    subcategories: SubcategoryDto[];
}

export interface CategoryListFiltersDto {
    search?: string;
    status?: CategoryStatus
    page: number;
    limit: number;
}

export interface PaginatedCategoryDto {
    items: CategoryListItemDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
