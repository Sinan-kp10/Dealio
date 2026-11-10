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

export type ProfileVerficationDto = PendingEnterpriseListItemDto;
