import { PrismaClient } from "@prisma/client";
import { IRoutesRepository } from "../interfaces/routes-repository.interface";
import { RouteCommand } from "../dto/commands/routes.command";
import { RouteResponse } from "../dto/responses/routes.response";


export class RoutesRepository implements IRoutesRepository {

    constructor(private prisma: PrismaClient) { }


    async createRoute(route: RouteCommand): Promise<RouteResponse> {
        return await this.prisma.routes.create({ data: route });
    }
    async findAll(): Promise<RouteResponse[]> {
        return await this.prisma.route.findMany();
    }
    async findByUserId(userId: string): Promise<RouteResponse[] | null> {
        return await this.prisma.route.findMany({
            where: {
                userId: userId
            }
        })
    }

}