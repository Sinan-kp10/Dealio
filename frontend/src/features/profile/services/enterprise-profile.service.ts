import axiosInstance from "../../../app/lib/axios";
import type { CreateEnterpriseKycInput, EnterpriseKycDetailsResponse, SubmitKycResponse, UpdateEnterpriseKycInput } from "../types/enterprise-kyc.types";
import type { CategoryOption, CategoryOptionsResponse, EnterpriseProfile, EnterpriseProfileResponse, UpdateEnterpriseDetails } from "../types/enterprise-profile.types";
import type {CreateEnterpriseBankRecordFormData, EnterpriseBankRecordResponse,SubmitBankRecordResponse,UpdateEnterpriseBankRecordInput,} from "../types/enterprise-bank-record.types";

export const getEnterpriseProfile = async (): Promise<EnterpriseProfile> => {
  const response = await axiosInstance.get<EnterpriseProfileResponse>("/enterprise/profile");
  return response.data.data;
};

export const updateEnterpriseDetails = async (payload: UpdateEnterpriseDetails): Promise<EnterpriseProfile> => {
  const response = await axiosInstance.patch<EnterpriseProfileResponse>("/enterprise/profile", payload);
  return response.data.data;
};

export const getEnterpriseCategories = async (): Promise<CategoryOption[]> => {
  const response = await axiosInstance.get<CategoryOptionsResponse>("/enterprise/categories");
  return response.data.data;
};

export const getKycDetails = async (): Promise<EnterpriseKycDetailsResponse> => {
  const response = await axiosInstance.get<EnterpriseKycDetailsResponse>("/enterprise/kyc")
  return response.data
}

export const addKycDetails = async (payload : CreateEnterpriseKycInput ): Promise<SubmitKycResponse> => {
  const formData = new FormData();
  formData.append("businessType", payload.businessType);
  formData.append("fullLegalName", payload.fullLegalName);
  formData.append("documentType", payload.documentType);
  if (payload.image) {
    formData.append("image", payload.image);
  }

  const response = await axiosInstance.post<SubmitKycResponse>("/enterprise/kyc", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export const updateKycDetails = async (payload :  UpdateEnterpriseKycInput): Promise<SubmitKycResponse> => {
  const formData = new FormData();
  if (payload.businessType) formData.append("businessType", payload.businessType);
  if (payload.fullLegalName) formData.append("fullLegalName", payload.fullLegalName);
  if (payload.documentType) formData.append("documentType", payload.documentType);
  if (payload.image) formData.append("image", payload.image);

  const response = await axiosInstance.patch<SubmitKycResponse>("/enterprise/kyc", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export const getBankRecord = async (): Promise<EnterpriseBankRecordResponse> => {
  const response = await axiosInstance.get<EnterpriseBankRecordResponse>("/enterprise/bank-record");
  return response.data;
};

export const addBankRecord = async (payload: CreateEnterpriseBankRecordFormData): Promise<SubmitBankRecordResponse> => {
  const response = await axiosInstance.post<SubmitBankRecordResponse>("/enterprise/bank-record", payload);
  return response.data;
};

export const updateBankRecord = async (payload: UpdateEnterpriseBankRecordInput): Promise<SubmitBankRecordResponse> => {
  const response = await axiosInstance.patch<SubmitBankRecordResponse>("/enterprise/bank-record", payload);
  return response.data;
};
