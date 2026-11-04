import axiosInstance from "../../../app/lib/axios";
import type { CategoryListParams, CategoryListResponse } from "../types/category.types";
import type { CreateCategoryInput, CreateCategoryResponse } from "../types/create-category.types";
import type { UpdateCategoryInput, UpdateCategoryResponse } from "../types/update-category.types";

export const getCategories = async (params : CategoryListParams) : Promise<CategoryListResponse> => {
    const response = await axiosInstance.get<CategoryListResponse>("/admin/categories", {params})
    return response.data
}

export const createCategory = async (payload : CreateCategoryInput ) : Promise<CreateCategoryResponse> => {
    const response = await axiosInstance.post<CreateCategoryResponse>("/admin/categories", payload)
    return response.data
}

export const updateCategory = async (id: string, payload: UpdateCategoryInput): Promise<UpdateCategoryResponse> => {
    const response = await axiosInstance.patch<UpdateCategoryResponse>(`/admin/categories/${id}`, payload)
    return response.data
}
