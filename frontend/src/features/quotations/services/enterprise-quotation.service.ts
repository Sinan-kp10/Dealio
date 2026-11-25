import axiosInstance from "../../../app/lib/axios";
import type { AvailableQuotationParams, AvailableQuotationsResponse, MarkNotInterestedResponse } from "../types/enterprise-available-quotation.types";
import type { AvailableQuotationDetailsResponse } from "../types/enterprise-available-quotation-details.types";
import type { CreateEnterpriseProposalPayload, CreateEnterpriseProposalResponse, WithdrawEnterpriseProposalResponse } from "../types/enterprise-proposal.types";
import type { EnterpriseAcceptedProposalParams, EnterpriseAcceptedProposalsResponse } from "../types/enterprise-accepted-proposal.types";

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

export const getEnterpriseAcceptedProposals = async (params?: EnterpriseAcceptedProposalParams): Promise<EnterpriseAcceptedProposalsResponse> => {
  const response = await axiosInstance.get<EnterpriseAcceptedProposalsResponse>("/enterprise/quotations/accepted-requests", { params });
  return response.data;
};
