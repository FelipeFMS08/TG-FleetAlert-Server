import { PrismaClient } from "prisma/generated/client";
import { IUsersService } from "../interfaces/users-service.interface";
import { UsersRepository } from "../repositories/users.repository";
import { UsersService } from "../services/users.service";
import { Request, Response } from "express";
import { UserInfoCommand } from "../dto/commands/user.command";

export class UsersController {
    private usersService: IUsersService;

    constructor() {
        const prisma = new PrismaClient();
        const usersRepository = new UsersRepository(prisma);

        this.usersService = new UsersService(usersRepository);
    }

    async findAll(req: Request, res: Response) {
        try {
            const response = await this.usersService.findAll();
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async findUserInfos(req: Request, res: Response) {
        const userId  = req.params.id;
        try {
            const response = await this.usersService.findUserInfo(userId);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateUserInfos(req: Request, res: Response) {
        const command = req.body;
        const userId = req.params.id;
        try {
            const response = await this.usersService.updateUserInfo(userId, command);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}