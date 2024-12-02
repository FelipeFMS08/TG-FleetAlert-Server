import { IUserRepository } from "../interfaces/user-repository.interface";
import { AuthenticationDTO } from "../dto/AuthenticationDTO";
import { PrismaClient } from "@prisma/client";
import { User } from "prisma/generated/client";
import { UsersResponse } from "@/modules/users/dto/responses/users.response";


export class UserRepository implements IUserRepository {
    constructor(private prisma: PrismaClient) {}
    
    async verifyEmail(id: string): Promise<User> {
        return await this.prisma.user.update({
            where: { id: id },
            data: { emailVerified: true },
        });    
    }

    async createUserWithoutPassword(email: string, name: string): Promise<UsersResponse> {
        return this.prisma.user.create({
            data: {
                email,
                name: name,
                password: '',
                role: 'MEMBER',
                isFirstLogin: true,
                emailVerified: false,
            },
            select: {
                id: true,
                name: true,
                password: false,
                email: true,
                emailVerified: true,
                createdAt: false,
                isFirstLogin: false,
                role: true,
                photo: false
            }
        }) as UsersResponse;
    }

    async updatePassword(userId: string, newPassword: string): Promise<User> {
        return this.prisma.user.update({
            where: { id: userId },
            data: { password: newPassword, isFirstLogin: false },
        });
    }

    async updateEmail(userId: string, newEmail: string): Promise<User> {
        return this.prisma.user.update({
            where: { id: userId },
            data: { email: newEmail, emailVerified: false },
        });
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findUserById(userId: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }
}