import { SafeUser, User } from "../../../domain/entities/user.entity";
import { prisma } from "../../../../../infrastructure/database/prisma/prisma-client";
import { CreateUserData, UserRepository } from "../../../domain/repositories/user.repository";
import { customerSelect, CustomerMapper } from "../../mappers/customer.mappers";

export class PrismaUserRepository implements UserRepository {

    findById = async (id: string): Promise<SafeUser | null> => {
        const user = await prisma.users.findUnique({
            where: { id },
            select: customerSelect,
        });

        return user ? CustomerMapper.toSafeCustomer(user) : null;
    };

    findByEmail = async (email: string): Promise<User | null> => {
        return prisma.users.findUnique({
            where: { email },
        });
    };

    create = async (data: CreateUserData): Promise<SafeUser> => {
        const user = await prisma.users.create({
            data: {
                name: data.name,
                email: data.email,
                password_hash: data.passwordHash,
                role: data.role,
                enterprise_id: data.enterprise_id ?? null,
                phone: data.phone ?? null,
                email_verified: data.emailVerified,
            },
            select: customerSelect,
        });

        return CustomerMapper.toSafeCustomer(user);
    };

    updatePassword = async (id: string, passwordHash: string): Promise<void> => {
        await prisma.users.update({
            where: { id },
            data: {
                password_hash: passwordHash,
            },
        });
    };
}
