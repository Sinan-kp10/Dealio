import axiosInstance from "../../../../app/lib/axios";
import type { CustomerRecentQuotationsResponse } from "../../types/customer/customer-home.types";

export const getCustomerRecentQuotations = async (): Promise<CustomerRecentQuotationsResponse> => {
  const response = await axiosInstance.get<CustomerRecentQuotationsResponse>("/customer/quotations/recent");
  return response.data;
};
