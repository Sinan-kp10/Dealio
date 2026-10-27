import axiosInstance from "../../../app/lib/axios";
import type { CustomerListParams, CustomerListResponse,} from "../types/user-management.types";

export const getCustomers = async ( params: CustomerListParams,): Promise<CustomerListResponse> => {
  
  const response = await axiosInstance.get<CustomerListResponse>("/admin/customers",{ params })

  return response.data;
}

export const suspendAccount = async (accountId : string, reason : string) : Promise<void> => {

  await axiosInstance.patch(`/admin/customers/${encodeURIComponent(accountId)}/suspend`,{reason})
}

export const reactivateAccount = async (accountId : string) : Promise<void> => {

  await axiosInstance.patch(`/admin/customers/${encodeURIComponent(accountId)}/reactivate`)
}