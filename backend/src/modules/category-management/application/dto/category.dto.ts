export interface SubcategoryDto {
    id: string;
    categoryId: string;
    name: string;
    status: "ACTIVE" | "INACTIVE";
}

export interface CategoryListItemDto {
    id: string;
    name: string;
    status: "ACTIVE" | "INACTIVE";
    subcategories: SubcategoryDto[];
}

export interface CategoryListFiltersDto {
    search?: string;
    status?: "ACTIVE" | "INACTIVE";
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
