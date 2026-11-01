import axiosInstance from "../../../app/lib/axios";
import type {ChangeCustomerPassword, ChangeCustomerPasswordResponse, CustomerProfile,CustomerProfileResponse,UpdateCustomerProfile,UpdateCustomerProfileResponse} from "../types/customer.profile.types";

export const getCustomerProfile = async (): Promise<CustomerProfile> => {
  const response = await axiosInstance.get<CustomerProfileResponse>("/customer/profile");
  return response.data.data;
}

export const updateCustomerProfile = async (payload: UpdateCustomerProfile): Promise<UpdateCustomerProfileResponse> => {
  const response = await axiosInstance.patch<UpdateCustomerProfileResponse>("/customer/profile", payload)
  return response.data
}

export const changePassword = async (payload : ChangeCustomerPassword ) : Promise<ChangeCustomerPasswordResponse> => {
  const response =  await axiosInstance.post<ChangeCustomerPasswordResponse>("/auth/change-password", payload)
  return response.data
}