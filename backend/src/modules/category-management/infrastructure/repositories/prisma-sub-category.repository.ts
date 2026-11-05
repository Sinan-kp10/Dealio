import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { SubCategoryDto, SubCategoryStatus } from "../../application/dto/sub-category.dto";
import { ISubCategoryRepository } from "../../domain/repositories/sub-category.repository";
import { SubCategoryMapper, subCategorySelect } from "../mappers/sub-category.mapper";

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
}
