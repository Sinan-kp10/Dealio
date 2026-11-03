import axiosInstance from "../../../app/lib/axios";
import type { CategoryListParams, CategoryListResponse } from "../types/category.types";

export const getCategories = async (params : CategoryListParams) : Promise<CategoryListResponse> => {
    const response = await axiosInstance.get<CategoryListResponse>("/admin/categories", {params})
    return response.data
}