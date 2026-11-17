import axiosInstance from "../../../app/lib/axios";
import type {
    CreateQuotationRequestPayload,
    CreateQuotationResponse,
    QuotationListParams,
    QuotationListResponse,
} from "../types/quotation.types";

export const createQuotationRequest = async (payload: CreateQuotationRequestPayload): Promise<CreateQuotationResponse> => {
    const response = await axiosInstance.post<CreateQuotationResponse>("/customer/quotations", payload);
    return response.data;
};

export const getCustomerQuotations = async (params?: QuotationListParams): Promise<QuotationListResponse> => {
    const response = await axiosInstance.get<QuotationListResponse>("/customer/quotations", { params });
    return response.data;
};
