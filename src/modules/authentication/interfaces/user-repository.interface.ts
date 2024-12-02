import { UsersResponse } from "@/modules/users/dto/responses/users.response";
import { User } from "prisma/generated/client";

export interface IUserRepository {
    verifyEmail(id: string): Promise<User>;
    createUserWithoutPassword(email: string, name: string): Promise<UsersResponse>;
    updatePassword(userId: string, newPassword: string): Promise<User>;
    updateEmail(userId: string, newEmail: string): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
}