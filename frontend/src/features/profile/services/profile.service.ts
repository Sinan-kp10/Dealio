import axiosInstance from "../../../app/lib/axios";
import type {CustomerProfile,CustomerProfileResponse,UpdateCustomerProfile,UpdateCustomerProfileResponse} from "../types/customer.profile";

export const getCustomerProfile = async (): Promise<CustomerProfile> => {
  const response = await axiosInstance.get<CustomerProfileResponse>("/customer/profile");
  return response.data.data;
}

export const updateCustomerProfile = async (payload: UpdateCustomerProfile): Promise<UpdateCustomerProfileResponse> => {
  const response = await axiosInstance.patch<UpdateCustomerProfileResponse>("/customer/profile", payload)
  return response.data
}