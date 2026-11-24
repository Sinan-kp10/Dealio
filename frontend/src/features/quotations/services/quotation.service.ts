import axiosInstance from "../../../app/lib/axios";
import type { CustomerReceivedProposalsResponse, ReceivedProposalDetailsResponse, GetReceivedProposalsParams } from "../types/customer-received-proposal.types";
import type { QuotationDetailsResponse } from "../types/quotation-details";
import type {CreateQuotationRequestPayload,CreateQuotationResponse,QuotationListParams,QuotationListResponse,} from "../types/quotation.types";

export const createQuotationRequest = async (payload: CreateQuotationRequestPayload): Promise<CreateQuotationResponse> => {
    const response = await axiosInstance.post<CreateQuotationResponse>("/customer/quotations", payload);
    return response.data;
};

export const getCustomerQuotations = async (params?: QuotationListParams): Promise<QuotationListResponse> => {
    const response = await axiosInstance.get<QuotationListResponse>("/customer/quotations", { params });
    return response.data;
};

export const getCustomerQuotationDetails = async (id: string): Promise<QuotationDetailsResponse> => {
    const response = await axiosInstance.get<QuotationDetailsResponse>(`/customer/quotations/${id}`);
    return response.data;
};

export const cancelCustomerQuotation = async (id: string): Promise<void> => {
    await axiosInstance.patch<void>(`/customer/quotations/${id}`);
};

export const getCustomerReceivedProposals = async (quotationId: string,params?: GetReceivedProposalsParams): Promise<CustomerReceivedProposalsResponse> => {
    const response = await axiosInstance.get<CustomerReceivedProposalsResponse>(`/customer/quotations/${quotationId}/proposals`, { params });
    return response.data;
};

export const getReceivedProposalDetails = async (quotationId: string, proposalId: string): Promise<ReceivedProposalDetailsResponse> => {
    const response = await axiosInstance.get<ReceivedProposalDetailsResponse>(`/customer/quotations/${quotationId}/proposals/${proposalId}`);
    return response.data;
};
