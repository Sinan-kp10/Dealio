import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { IProfileRepository } from "../../domain/repositories/profile-repository";


export class PrismaProfileRepository implements IProfileRepository {

    findById = async (id: string): Promise<boolean> =>{
        const user = await prisma.users.findUnique({
            where : {id},
            select : {
                id : true
            }
        })

        return user !== null
    }

    findProfilePictureKey = async (userId: string): Promise<string | null> => {
        const user = await prisma.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                profile_picture_key: true,
            },
        });

        return user?.profile_picture_key ?? null;
    }

    updateProfilePictureKey = async ( userId: string, profilePictureKey: string): Promise<void> => {
        await prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                profile_picture_key: profilePictureKey,
            },
        });
    }

    removeProfilePictureKey = async (userId: string): Promise<void> => {
        await prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                profile_picture_key: null,
            },
        });
    }
}