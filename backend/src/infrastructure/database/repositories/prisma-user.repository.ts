import { User } from "../../../domain/auth/entities/user.entity";
import { prisma } from "../prisma-client"; 
import { CreateUserData, UserRepository } from "../../../domain/auth/repositories/user.repository";

export class PrismaUserRepository implements UserRepository {

    findById = async (id: string): Promise<User | null> => {
        return prisma.users.findUnique({
            where : {id}
        })
    }

    findByEmail = async (email: string): Promise<User | null> => {
        return prisma.users.findUnique({
            where : {email}
        })
    }

    create = async (data: CreateUserData): Promise<User> => {
        return prisma.users.create({
            data : {
                name: data.name,
                email: data.email,
                password_hash: data.passwordHash,
                role: data.role,
                enterprise_id: data.enterprise_id ?? null,
                phone: data.phone ?? null,
                status: data.status,

            }
        })
    }
}