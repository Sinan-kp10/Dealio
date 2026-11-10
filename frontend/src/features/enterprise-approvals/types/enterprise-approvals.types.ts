export interface PendingEnterprise {
    id: string;
    enterpriseName: string;
    contactPerson: string;
    email: string;
    phone: string | null;
    categoryName: string | null;
    createdAt: string;
}

export interface PendingEnterpriseListParams {
    search?: string;
    category?: string;
    page?: number;
    limit?: number;
}

export interface PaginatedPendingEnterprises {
    items: PendingEnterprise[];
    page: number;
    limit: number;
    totalPages: number;
    total: number;
}

export interface PendingEnterpriseListResponse {
    success: boolean;
    message: string;
    data: PaginatedPendingEnterprises;
}

