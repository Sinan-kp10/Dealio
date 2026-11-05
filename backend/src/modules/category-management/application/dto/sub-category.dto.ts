export type SubCategoryStatus = "ACTIVE" | "INACTIVE"

export interface CreateSubCategoryDto {
    categoryId : string
    subCategoryName : string
    status : SubCategoryStatus
}

export interface SubCategoryDto {
    id: string;
    categoryId : string;
    name: string;
    status: SubCategoryStatus
}

export interface SubCategoryListItemDto {
    id: string;
    categoryId: string;
    categoryName: string;
    name: string;
    status: SubCategoryStatus;
    updatedAt: Date;
}

export interface SubCategoryListFiltersDto {
    search?: string;
    status?: SubCategoryStatus;
    categoryId?: string;
    page: number;
    limit: number;
}

export interface PaginatedSubCategoryDto {
    items: SubCategoryListItemDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface UpdateSubCategoryDto {
    id: string;
    subCategoryName?: string;
    status?: SubCategoryStatus
}

export interface UpdatedSubCategoryFieldsDto {
    subCategoryName?: string;
    status?: SubCategoryStatus
}
