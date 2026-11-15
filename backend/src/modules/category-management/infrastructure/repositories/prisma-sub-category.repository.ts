import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { PaginatedSubCategoryDto, SubCategoryDto, SubCategoryListFiltersDto, SubCategoryStatus, UpdatedSubCategoryFieldsDto } from "../../application/dto/sub-category.dto";
import { ISubCategoryRepository } from "../../domain/repositories/sub-category.repository";
import { SubCategoryMapper, subCategoryListSelect, subCategorySelect } from "../mappers/sub-category.mapper";

export class PrismaSubCategoryRepository implements ISubCategoryRepository {

    findById= async(id: string): Promise<SubCategoryDto | null> => {
        
        const subCategory = await prisma.subcategories.findUnique({
            where : {id},
            select : subCategorySelect
        })

        return subCategory ? SubCategoryMapper.toDto(subCategory) : null
    }

    findByName= async(name: string): Promise<SubCategoryDto | null> =>{
        const subCategory = await prisma.subcategories.findUnique({
            where : {name : name},
            select : subCategorySelect
        })

        return subCategory ? SubCategoryMapper.toDto(subCategory) : null
    }

    createSubCategory= async (name: string, id : string, status: SubCategoryStatus): Promise<SubCategoryDto> => {
        
        const subCategory = await prisma.subcategories.create({
            data : {
                name : name,
                status : status,
                category_id : id
            },
            select : subCategorySelect
        })

        return SubCategoryMapper.toDto(subCategory)    
    }

    findSubCategories = async (filters: SubCategoryListFiltersDto): Promise<PaginatedSubCategoryDto> => {
        const DEFAULT_LIMIT = 5;
        const { search, limit, page, status, categoryId } = filters;
        const searchTerm = search?.trim();
        const pageSize = Number(limit) || DEFAULT_LIMIT;
        const pageNumber = Number(page) || 1;

        const where = {
            ...(status ? { status } : {}),
            ...(categoryId ? { category_id: categoryId } : {}),
            ...(searchTerm
                ? {
                    name: {
                        contains: searchTerm,
                        mode: "insensitive" as const,
                    },
                }
                : {}),
        };

        const [subcategories, total] = await Promise.all([
            prisma.subcategories.findMany({
                where,
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
                orderBy: { created_at: "desc" },
                select: subCategoryListSelect,
            }),
            prisma.subcategories.count({ where }),
        ]);

        return {
            items: subcategories.map(SubCategoryMapper.toListItemDto),
            page: pageNumber,
            limit: pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        };
    }

    updateSubCategory = async (id: string, data: UpdatedSubCategoryFieldsDto): Promise<SubCategoryDto> => {
        const subCategory = await prisma.subcategories.update({
            where: { id },
            data: {
                category_id: data.categoryId,
                name: data.subCategoryName,
                status: data.status,
            },
            select: subCategorySelect,
        });

        return SubCategoryMapper.toDto(subCategory);
    };
}
