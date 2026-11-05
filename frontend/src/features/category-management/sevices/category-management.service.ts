import axiosInstance from "../../../app/lib/axios";
import type { CategoryListParams, CategoryListResponse } from "../types/category.types";
import type { CreateCategoryInput, CreateCategoryResponse } from "../types/create-category.types";
import type { CreateSubCategoryInput, CreateSubCategoryResponse, SubCategoryListParams, SubCategoryListResponse } from "../types/sub-category";
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

export const getSubCategories = async (params : SubCategoryListParams) : Promise<SubCategoryListResponse> => {
    const response = await axiosInstance.get<SubCategoryListResponse>("/admin/subcategories", {params})
    return response.data
}

export const createSubCategory = async(payload : CreateSubCategoryInput) : Promise<CreateSubCategoryResponse> => {
    const response = await axiosInstance.post<CreateSubCategoryResponse>("/admin/subcategories",payload)
    return response.data
}
