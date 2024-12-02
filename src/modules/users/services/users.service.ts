import { UserInfoCommand } from "../dto/commands/user.command";
import { UserInfosResponse } from "../dto/responses/users-info.response";
import { UsersResponse } from "../dto/responses/users.response";
import { IUsersRepository } from "../interfaces/users-repository.interface";
import { IUsersService } from "../interfaces/users-service.interface";


export class UsersService implements IUsersService {
    constructor(private usersRepository: IUsersRepository){}

    async findAll(): Promise<UsersResponse[] | null> {
        return await this.usersRepository.findAll();
    }
    async findUserInfo(userId: string): Promise<UserInfosResponse | null> {
        return await this.usersRepository.findUserInfo(userId);
    }

    async updateUserInfo(userId: string, command: UserInfoCommand): Promise<UserInfosResponse> {
        return await this.usersRepository.updateUserInfo(userId, command);
    }
}