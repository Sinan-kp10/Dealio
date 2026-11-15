import axiosInstance from "../app/lib/axios";
import type { ActiveCategoriesResponse } from "../types/category.types";

export const getActiveCategories = async (): Promise<ActiveCategoriesResponse> => {
    const response = await axiosInstance.get<ActiveCategoriesResponse>("/categories/active");
    return response.data;
};
