import { UsersResponse } from "@/modules/users/dto/responses/users.response";

export interface AuthenticationServiceInterface {
    register(email: string, name: string, token: string): Promise<UsersResponse | null>;
    login(email: string, password?: string): Promise<string>;
    validateUser(email: string, password?: string): Promise<string | null>;
    changePassword(userId: string, newPassword: string): Promise<void>;
    changeEmail(userId: string, newEmail: string): Promise<void>;   
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    verifyEmail(token: string): Promise<void>;
    refreshToken(token: string): Promise<string>;
}