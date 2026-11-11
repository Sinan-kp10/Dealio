export interface PendingEnterpriseListItemDto {
    id: string;
    enterpriseName: string;
    contactPerson: string;
    email: string;
    phone: string | null;
    categoryName: string | null;
    createdAt: Date;
}

export interface PendingEnterpriseFiltersDto {
    search?: string;
    category?: string;
    page: number;
    limit: number;
}

export interface PaginatedPendingEnterprisesDto {
    items: PendingEnterpriseListItemDto[];
    page: number;
    limit: number;
    totalPages: number;
    total: number;
}

export interface EnterpriseCompanyInfoDto {
    enterpriseId: string;
    enterpriseName: string;
    contactPerson: string;
    email: string;
    phone: string | null;
    phoneVerified: boolean;
    category: {
        id: string;
        name: string;
    } | null;
    subcategories: {
        id: string;
        name: string;
    }[];
    description: string | null;
    createdAt: Date;
}

export interface EnterpriseKycApprovalDto {
    id: string;
    enterpriseId: string;
    businessType: string;
    legalName: string;
    documentType: string;
    documentKey: string;
    documentUrl?: string | null;
    status: "PENDING" | "VERIFIED";
    createdAt: Date;
}

export interface EnterpriseBankAccountApprovalDto {
    id: string;
    enterpriseId: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    accountType: string;
    upiId: string | null;
    status: "PENDING" | "VERIFIED";
    createdAt: Date;
}

export interface EnterpriseApprovalDetailsDto {
    companyInfo: EnterpriseCompanyInfoDto;
    kyc: EnterpriseKycApprovalDto;
    bankAccount: EnterpriseBankAccountApprovalDto;
}

