import { UserInfoCommand } from "../dto/commands/user.command";
import { UserInfosResponse } from "../dto/responses/users-info.response";
import { UsersResponse } from "../dto/responses/users.response";

export interface IUsersService {
    findAll(): Promise<UsersResponse[] | null>;
    findUserInfo(userId: string): Promise<UserInfosResponse | null>;
    updateUserInfo(userId: string, command: UserInfoCommand): Promise<UserInfosResponse>;
}