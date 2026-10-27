import axiosInstance from "../../../app/lib/axios";
import type { EnterpriseListParams, EnterpriseListResponse } from "../types/enterprise-management.types";
import type { CustomerListParams, CustomerListResponse,} from "../types/user-management.types";

export const getCustomers = async ( params: CustomerListParams): Promise<CustomerListResponse> => {
  
  const response = await axiosInstance.get<CustomerListResponse>("/admin/customers",{ params })

  return response.data;
}

export const suspendCustomerAccount = async (accountId : string, reason : string) : Promise<void> => {

  await axiosInstance.patch(`/admin/customers/${encodeURIComponent(accountId)}/suspend`,{reason})
}

export const reactivateCustomerAccount = async (accountId : string) : Promise<void> => {

  await axiosInstance.patch(`/admin/customers/${encodeURIComponent(accountId)}/reactivate`)
}

export const getEnterprise = async(params : EnterpriseListParams) : Promise<EnterpriseListResponse> => {

  const response = await axiosInstance.get<EnterpriseListResponse>("/admin/enterprises", {params})


  return response.data
}

export const suspendEnterpriseAccount = async (accountId : string, reason : string) : Promise<void> => {

  await axiosInstance.patch(`/admin/enterprises/${encodeURIComponent(accountId)}/suspend`,{reason})
}

export const reactivateEnterpriseAccount = async (accountId : string) : Promise<void> => {

  await axiosInstance.patch(`/admin/enterprises/${encodeURIComponent(accountId)}/reactivate`)
}