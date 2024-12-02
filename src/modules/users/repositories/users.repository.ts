import { IUserRepository } from "@/modules/authentication/interfaces/user-repository.interface";
import { IUsersRepository } from "../interfaces/users-repository.interface";
import { UserInfosResponse } from "../dto/responses/users-info.response";
import { UsersResponse } from "../dto/responses/users.response";
import { PrismaClient } from "prisma/generated/client";
import { UserInfoCommand } from "../dto/commands/user.command";


export class UsersRepository implements IUsersRepository {
    constructor(private prisma: PrismaClient) { }
    async findAll(): Promise<UsersResponse[] | null> {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                password: false,
                email: true,
                emailVerified: true,
                createdAt: false,
                isFirstLogin: false,
                role: true,
                photo: true
            }
        }) as UsersResponse[];
    }
    async findUserInfo(userId: string): Promise<UserInfosResponse | null> {
        return await this.prisma.user.findFirst(
            {
                where: {
                    id: userId
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
                    photo: true
                }
            }) as UserInfosResponse;
    }

    async updateUserInfo(userId: string, command: UserInfoCommand): Promise<UserInfosResponse> {
        return await this.prisma.user.update({
            where: {id: userId},
            data: command,
            select: {
                id: true,
                name: true,
                password: false,
                email: true,
                emailVerified: true,
                createdAt: false,
                isFirstLogin: false,
                role: true,
                photo: true
            }
        }) as UserInfosResponse;
    }


}