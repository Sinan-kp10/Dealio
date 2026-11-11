import type { BusinessType, DocumentType, BankAccountType } from "../../../constants/enterprise.constants";

export interface EnterpriseCategoryInfo {
    id: string;
    name: string;
}

export interface EnterpriseSubcategoryInfo {
    id: string;
    name: string;
}

export interface EnterpriseCompanyInfoDto {
    enterpriseId: string;
    enterpriseName: string;
    contactPerson: string;
    email: string;
    phone: string | null;
    phoneVerified: boolean;
    category: EnterpriseCategoryInfo | null;
    subcategories: EnterpriseSubcategoryInfo[];
    description: string | null;
    createdAt: string;
}

export interface EnterpriseKycApprovalDto {
    id: string;
    enterpriseId: string;
    businessType: BusinessType;
    legalName: string;
    documentType: DocumentType;
    documentUrl: string | null;
    status: "PENDING" | "VERIFIED" | "REJECTED";
    rejectionReason: string | null;
    createdAt: string;
}

export interface EnterpriseBankAccountApprovalDto {
    id: string;
    enterpriseId: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    accountType: BankAccountType;
    upiId: string | null;
    status: "PENDING" | "VERIFIED" | "REJECTED";
    rejectionReason: string | null;
    createdAt: string;
}

export interface EnterpriseApprovalDetailsDto {
    companyInfo: EnterpriseCompanyInfoDto;
    kyc: EnterpriseKycApprovalDto | null;
    bankAccount: EnterpriseBankAccountApprovalDto | null;
}

export interface EnterpriseApprovalDetailsResponse {
    success: boolean;
    message: string;
    data: EnterpriseApprovalDetailsDto;
}

