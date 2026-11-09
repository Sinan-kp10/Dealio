import axiosInstance from "../../../app/lib/axios";
import type { CategoryOption, CategoryOptionsResponse, EnterpriseProfile, EnterpriseProfileResponse, UpdateEnterpriseDetails } from "../types/enterprise-profile.types";

export const getEnterpriseProfile = async (): Promise<EnterpriseProfile> => {
  const response = await axiosInstance.get<EnterpriseProfileResponse>("/enterprise/profile");
  return response.data.data;
};

export const updateEnterpriseDetails = async (payload: UpdateEnterpriseDetails): Promise<EnterpriseProfile> => {
  const response = await axiosInstance.patch<EnterpriseProfileResponse>("/enterprise/profile", payload);
  return response.data.data;
};

export const getEnterpriseCategories = async (): Promise<CategoryOption[]> => {
  const response = await axiosInstance.get<CategoryOptionsResponse>("/enterprise/categories");
  return response.data.data;
};
