export type CategoryStatus = "ACTIVE" | "INACTIVE";

export interface CategoryListItemDto {
    id: string;
    name: string;
    status: CategoryStatus;
    subcategoriesCount: number;
    updatedAt: Date;
}

export interface CategoryListFiltersDto {
    search?: string;
    status?: CategoryStatus;
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
