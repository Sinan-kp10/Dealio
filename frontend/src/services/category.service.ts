import axiosInstance from "../app/lib/axios";

export interface ActiveCategory {
    id: string;
    name: string;
}

export interface ActiveCategoriesResponse {
    success: boolean;
    message: string;
    data: ActiveCategory[];
}

export const getActiveCategories = async (): Promise<ActiveCategoriesResponse> => {
    const response = await axiosInstance.get<ActiveCategoriesResponse>("/categories/active");
    return response.data;
};

