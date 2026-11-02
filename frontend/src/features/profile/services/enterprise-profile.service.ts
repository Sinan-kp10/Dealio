import axiosInstance from "../../../app/lib/axios";
import type { EnterpriseProfile, EnterpriseProfileResponse } from "../types/enterprise-profile.types";

export const getEnterpriseProfile = async (): Promise<EnterpriseProfile> => {
  const response = await axiosInstance.get<EnterpriseProfileResponse>("/enterprise/profile");
  return response.data.data;
};
