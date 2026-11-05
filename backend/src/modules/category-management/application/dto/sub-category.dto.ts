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

export interface UpdateSubCategoryDto {
    id: string;
    subCategoryName?: string;
    status?: SubCategoryStatus
}

export interface UpdatedSubCategoryFieldsDto {
    subCategoryName?: string;
    status?: SubCategoryStatus
}
