import axiosInstance from "../../../app/lib/axios";
import type {
  EnterpriseQuotationListParams,
  EnterpriseQuotationListResponse,
  MarkNotInterestedResponse,
} from "../types/enterprise-quotation.types";
import type { EnterpriseQuotationDetailsResponse } from "../types/enterprise-quotation-details.types";

export const getAvailableEnterpriseQuotations = async (params?: EnterpriseQuotationListParams): Promise<EnterpriseQuotationListResponse> => {
  const response = await axiosInstance.get<EnterpriseQuotationListResponse>("/enterprise/quotations", { params });
  return response.data;
};

export const getEnterpriseQuotationDetails = async (id: string): Promise<EnterpriseQuotationDetailsResponse> => {
  const response = await axiosInstance.get<EnterpriseQuotationDetailsResponse>(`/enterprise/quotations/${id}`);
  return response.data;
};

export const markQuotationNotInterested = async (quotationId: string): Promise<MarkNotInterestedResponse> => {
  const response = await axiosInstance.post<MarkNotInterestedResponse>(`/enterprise/quotations/${quotationId}/not-interested`);
  return response.data;
};
