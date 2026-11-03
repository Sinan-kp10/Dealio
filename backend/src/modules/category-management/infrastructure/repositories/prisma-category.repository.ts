import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { CategoryListFiltersDto, CategoryListItemDto, CategoryStatus, PaginatedCategoryDto } from "../../application/dto/category.dto";
import { CategoryDto } from "../../application/dto/create-category.dto";
import { ICategoryRepository } from "../../domain/repositories/category.repository";
import { categorySelect, CategoryMapper } from "../mappers/category.mapper";

export class PrismaCategoryRepository implements ICategoryRepository {
    
    findById = async (id: string): Promise<CategoryListItemDto | null> => {
        const category = await prisma.categories.findUnique({
            where: { id },
            select: categorySelect,
        });

        return category ? CategoryMapper.toDto(category) : null;
    }

    findCategories = async (filters: CategoryListFiltersDto): Promise<PaginatedCategoryDto> => {
        const DEFAULT_LIMIT = 5;

        const { search, limit, page, status } = filters;
        const searchTerm = search?.trim();
        const pageSize = limit || DEFAULT_LIMIT;

        const where = {
            ...(status ? { status } : {}),
            ...(searchTerm
                ? {
                    name: {
                        contains: searchTerm,
                        mode: "insensitive" as const,
                    },
                }
                : {}),
        };

        const [categories, total] = await Promise.all([
            prisma.categories.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { created_at: "desc" },
                select: categorySelect,
            }),
            prisma.categories.count({ where }),
        ]);

        return {
            items: categories.map(CategoryMapper.toDto),
            page,
            limit: pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        };
    }

    findByName = async (name: string): Promise<CategoryDto | null> => {
        const category = await prisma.categories.findUnique({
            where: {
                name: name,
            },
        })

        return category
    }

    createCategory = async (name : string, status : CategoryStatus): Promise<CategoryDto> => {
        
        const category = await prisma.categories.create({
            data : {
                name : name,
                status : status
            },
            select : {
                id : true,
                name : true,
                status : true
            }
        })

        return {
            id: category.id,
            name: category.name,
            status: category.status,
        };
    }
}
