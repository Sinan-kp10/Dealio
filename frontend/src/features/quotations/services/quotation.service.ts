import axiosInstance from "../../../app/lib/axios";
import type { CreateQuotationRequestPayload, CreateQuotationResponse } from "../types/quotation.types";

export const createQuotationRequest = async (payload: CreateQuotationRequestPayload): Promise<CreateQuotationResponse> => {
    const response = await axiosInstance.post<CreateQuotationResponse>("/customer/quotations", payload);
    return response.data;
};
