export interface ActiveSubCategory {
    id: string;
    name: string;
}

export interface ActiveCategory {
    id: string;
    name: string;
    subcategories?: ActiveSubCategory[];
}

export interface ActiveCategoriesResponse {
    success: boolean;
    message: string;
    data: ActiveCategory[];
}
