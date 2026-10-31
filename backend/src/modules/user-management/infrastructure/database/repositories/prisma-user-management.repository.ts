import { prisma } from "../../../../../infrastructure/database/prisma/prisma-client"
import { CustomerListFiltersDto, CustomerListItemDto, PaginatedCustomerDto,} from "../../../application/dto/customer-list-item.dto"
import { EnterpriseListFiltersDto, PaginatedEnterprisesDto } from "../../../application/dto/enterprise-list-item.dto"
import { IUserManagementRepository } from "../../../domain/repositories/user-management.repository"
import { customerListSelect, CustomerManagementMapper } from "../../mappers/customer-management.mapper"
import { enterpriseListSelect, EnterpriseManagementMapper } from "../../mappers/enterprise-managemant.mapper"

export class PrismaUserManagementRepository implements IUserManagementRepository {

    findById = async (id : string) : Promise<CustomerListItemDto | null> => {

        const user = await prisma.users.findUnique({
            where : {id},
            select : customerListSelect
        })

        return user ? CustomerManagementMapper.toDto(user) : null
    }

    findCustomers = async(filters: CustomerListFiltersDto): Promise<PaginatedCustomerDto> => {

        const DEFAULT_LIMIT = 5;

        const {search, status, page, limit } = filters
        const searchTerm = search?.trim()

        const where = {
            role: "CUSTOMER" as const,
            ...(status ? {status} : {}),
            ...(searchTerm ? {
                OR : [
                    {
                        name: {
                            contains: searchTerm,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        email: {
                            contains: searchTerm,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        phone: {
                            contains: searchTerm,
                            mode: "insensitive" as const,
                        },
                    },
                ]
                
            }: {})
        }

        const [users, total] = await Promise.all([
            prisma.users.findMany({
                where,
                skip: (page - 1) * (limit || DEFAULT_LIMIT),
                take: limit,
                orderBy: { created_at: "desc" },
                select: customerListSelect,
            }),
            prisma.users.count({ where }),
        ]);

        return {
            items : users.map(CustomerManagementMapper.toDto),
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        }
    }

    findEnterprises = async (filters: EnterpriseListFiltersDto): Promise<PaginatedEnterprisesDto> => {

        const DEFAULT_LIMIT = 5
        const {search, status, category, page, limit} = filters
        const searchTerm = search?.trim()

        const where = {
            status: "APPROVED" as const,

            users: {
                some: {
                    role: "ENTERPRISE_MANAGER" as const,
                    ...(status ? { status } : {}),
                },
            },

            ...(category
                ? {
                    subcategory: {
                        is: {
                            category: {
                                is: {
                                    name: {
                                        equals: category,
                                        mode: "insensitive" as const,
                                    },
                                },
                            },
                        },
                    },
                }
            : {}),

            ...(searchTerm
                ? {
                    OR: [
                        {
                            enterprise_name: {
                                contains: searchTerm,
                                mode: "insensitive" as const,
                            },
                        },
                        {
                            users: {
                                some: {
                                    role: "ENTERPRISE_MANAGER" as const,
                                    OR: [
                                        {
                                            name: {
                                                contains: searchTerm,
                                                mode: "insensitive" as const,
                                            },
                                        },
                                        {
                                            email: {
                                                contains: searchTerm,
                                                mode: "insensitive" as const,
                                            },
                                        },
                                        {
                                            phone: {
                                                contains: searchTerm,
                                                mode: "insensitive" as const,
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                }
            : {}),
        };

        const [enterprises, total] = await Promise.all([
            prisma.enterprises.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { created_at: "desc" },
                select: enterpriseListSelect,
            }),
            prisma.enterprises.count({ where }),
        ]);

        return {
            items: enterprises.map(EnterpriseManagementMapper.toDto),
            page,
            limit: limit || DEFAULT_LIMIT,
            totalPages: Math.ceil(total / limit),
        };

    }

    suspendAccount = async(accountId: string, reason: string): Promise<void> => {

        await prisma.users.update({
            where : { id : accountId },
            data : {
                status : "SUSPENDED",
                suspended_at : new Date(),
                suspension_reason: reason,
            }
        });

    }

    reactivateAccount = async (accountId: string): Promise<void> => {

        await prisma.users.update({
            where : { id : accountId },
            data : {
                status : "ACTIVE",
                suspended_at : null,
                suspension_reason: null,
            }
        });

    }
}