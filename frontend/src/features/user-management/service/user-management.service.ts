import axiosInstance from "../../../app/lib/axios";
import type { CustomerListParams, CustomerListResponse,} from "../types/user-management.types";

export const getCustomers = async ( params: CustomerListParams,): Promise<CustomerListResponse> => {
  
    const response = await axiosInstance.get<CustomerListResponse>("/admin/customers",{ params })

  return response.data;
};