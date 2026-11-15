import axiosInstance from "../../../app/lib/axios";
import type {PendingEnterpriseListParams,PendingEnterpriseListResponse,} from "../types/enterprise-approvals.types";
import type {EnterpriseApprovalDetailsResponse,} from "../types/enterprise-approval-details.types";

export const getPendingEnterprises = async (params?: PendingEnterpriseListParams): Promise<PendingEnterpriseListResponse> => {
    const response = await axiosInstance.get<PendingEnterpriseListResponse>("/admin/enterprises/pending",{ params })
    return response.data;
};

export const getEnterpriseApprovalDetails = async (enterpriseId: string): Promise<EnterpriseApprovalDetailsResponse> => {
    const response = await axiosInstance.get<EnterpriseApprovalDetailsResponse>(`/admin/enterprises/${enterpriseId}/approval-details`);
    return response.data;
};

export const verifyEntepriseKyc = async (enterpriseId: string): Promise<void> => {
    await axiosInstance.post<void>(`/admin/enterprises/${enterpriseId}/kyc/verify`);
};

export const rejectEntepriseKyc = async (enterpriseId: string, reason : string): Promise<void> => {
    await axiosInstance.post<void>(`/admin/enterprises/${enterpriseId}/kyc/reject`, { reason });
};

export const verifyEnterpriseBankRecord = async (enterpriseId: string): Promise<void> => {
    await axiosInstance.post<void>(`/admin/enterprises/${enterpriseId}/bank/verify`);
};

export const rejectEnterpriseBankRecord = async (enterpriseId: string, reason: string): Promise<void> => {
    await axiosInstance.post<void>(`/admin/enterprises/${enterpriseId}/bank/reject`, { reason });
};

