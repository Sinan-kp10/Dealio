import axiosInstance from "../../../app/lib/axios";
import type { CustomerProfile, CustomerProfileResponse } from "../types/customer.profile";

export const getCustomerProfile = async () : Promise<CustomerProfile> => {

    const response = await axiosInstance.get<CustomerProfileResponse>("/customer/profile")

    return response.data.data
}