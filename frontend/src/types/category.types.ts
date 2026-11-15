export interface ActiveCategory {
    id: string;
    name: string;
}

export interface ActiveCategoriesResponse {
    success: boolean;
    message: string;
    data: ActiveCategory[];
}
