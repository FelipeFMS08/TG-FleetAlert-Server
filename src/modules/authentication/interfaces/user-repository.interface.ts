import { User } from "prisma/generated/client";

export interface IUserRepository {
    verifyEmail(id: string): Promise<User>;
    createUserWithoutPassword(email: string, name: string, temporaryPassword: string): Promise<User>;
    updatePassword(userId: string, newPassword: string): Promise<User>;
    updateEmail(userId: string, newEmail: string): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
}