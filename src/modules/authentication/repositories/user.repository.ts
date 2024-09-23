import { IUserRepository } from "../interfaces/user-repository.interface";
import { AuthenticationDTO } from "../dto/AuthenticationDTO";
import { PrismaClient, User } from "@prisma/client";


export class UserRepository implements IUserRepository {
    constructor(private prisma: PrismaClient) {}
    
    async verifyEmail(id: string): Promise<User> {
        return await this.prisma.user.update({
            where: { id: id },
            data: { emailVerified: true },
        });    
    }

    async createUserWithoutPassword(email: string, temporaryPassword: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                email,
                password: temporaryPassword,
                role: 'MEMBER', // Cargo padrão
                isFirstLogin: true,
                emailVerified: false,
            },
        });
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