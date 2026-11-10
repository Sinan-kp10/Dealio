import axiosInstance from "../../../app/lib/axios";
import type {PendingEnterpriseListParams,PendingEnterpriseListResponse,} from "../types/enterprise-approvals.types";

export const getPendingEnterprises = async (params?: PendingEnterpriseListParams): Promise<PendingEnterpriseListResponse> => {
    const response = await axiosInstance.get<PendingEnterpriseListResponse>("/admin/enterprises/pending",{ params })
    return response.data;
};

