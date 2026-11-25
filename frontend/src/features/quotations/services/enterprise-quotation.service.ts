import axiosInstance from "../../../app/lib/axios";
import type { AvailableQuotationParams, AvailableQuotationsResponse, MarkNotInterestedResponse } from "../types/enterprise-available-quotation.types";
import type { AvailableQuotationDetailsResponse } from "../types/enterprise-available-quotation-details.types";
import type { CreateEnterpriseProposalPayload, CreateEnterpriseProposalResponse, WithdrawEnterpriseProposalResponse } from "../types/enterprise-proposal.types";
import type { EnterpriseAcceptedRequestParams, EnterpriseAcceptedRequestsResponse } from "../types/enterprise-accepted-request.types";

export const getAvailableEnterpriseQuotations = async (params?: AvailableQuotationParams): Promise<AvailableQuotationsResponse> => {
  const response = await axiosInstance.get<AvailableQuotationsResponse>("/enterprise/quotations", { params });
  return response.data;
};

export const getEnterpriseAvailableQuotationDetails = async (id: string): Promise<AvailableQuotationDetailsResponse> => {
  const response = await axiosInstance.get<AvailableQuotationDetailsResponse>(`/enterprise/quotations/${id}`);
  return response.data;
};

export const markQuotationNotInterested = async (quotationId: string): Promise<MarkNotInterestedResponse> => {
  const response = await axiosInstance.post<MarkNotInterestedResponse>(`/enterprise/quotations/${quotationId}/not-interested`);
  return response.data;
};

export const submitEnterpriseProposal = async (quotationId: string, payload: CreateEnterpriseProposalPayload): Promise<CreateEnterpriseProposalResponse> => {
  const response = await axiosInstance.post<CreateEnterpriseProposalResponse>(`/enterprise/quotations/${quotationId}/proposals`, payload);
  return response.data;
};

export const withdrawEnterpriseProposal = async (proposalId: string): Promise<WithdrawEnterpriseProposalResponse> => {
  const response = await axiosInstance.patch<WithdrawEnterpriseProposalResponse>(`/enterprise/quotations/proposals/${proposalId}/withdraw`);
  return response.data;
};

export const getEnterpriseAcceptedRequests = async (params?: EnterpriseAcceptedRequestParams): Promise<EnterpriseAcceptedRequestsResponse> => {
  const response = await axiosInstance.get<EnterpriseAcceptedRequestsResponse>("/enterprise/quotations/accepted-requests", { params });
  return response.data;
};
