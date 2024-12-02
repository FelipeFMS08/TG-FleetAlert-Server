import { Request, Response } from "express";
import { IRoutesService } from "../interfaces/routes-service.interface";
import { RouteCommand } from "../dto/commands/routes.command";
import { RouteResponse, RouteTrackingResponse } from "../dto/responses/routes.response";
import { RoutesService } from "../services/routes.service";
import { RoutesRepository } from "../repositories/routes.repository";
import { PrismaClient } from "../../../../prisma/generated/client";


export class RouteController {
    private routesService: IRoutesService;

    constructor(){
        const prisma = new PrismaClient();
        const routeRepository = new RoutesRepository(prisma);
        this.routesService = new RoutesService(routeRepository);
    }

    async createRoute(request: Request, response: Response) {
        try {
            const routeData: RouteCommand = request.body;
            const createdRoute: RouteResponse = await this.routesService.createRoute(routeData);
            return response.status(201).send(createdRoute);
        } catch (error) {
            return response.status(400).send(response + "" + error);
        }
    }

    async findAll(request: Request, response: Response): Promise<Response> {
        try {
            const routes: RouteResponse[] | null = await this.routesService.findAll();
            return response.status(200).send(routes);
        } catch (error) {
            return response.status(400).send(response + "" + error);
        }
    }

    async findRouteByUserId(request: Request, response: Response) {
        console.log("CHEGOU 2");

        try {
            const userId: string = request.params.userId;
            const routes: RouteTrackingResponse[] | null = await this.routesService.findRouteByUserId(userId);
            response.status(200).send(routes);
        } catch (error) {
            return response.status(400).send(response + "" + error);
        }
    }

    async findRouteByManagerId(request: Request, response: Response) {
        console.log("CHEGOU");

        try {
            const managerId: string = request.params.managerId;
            const routes: RouteTrackingResponse[] | null = await this.routesService.findRouteByManagerId(managerId);
            response.status(200).send(routes);
        } catch (error) {
            return response.status(400).send(response + "" + error);
        }
    }

    async deleteRoute(request: Request, response: Response) {
        try {
                const routeId: number = parseInt(request.params.routeId, 10);
                const isDeleted: boolean = await this.routesService.deleteRoute(routeId);
                if (!isDeleted) {
                    return response.status(404).send({ message: "Rota não encontrada" });
                }
                return response.status(204).send();
        }  catch (error) {
            return response.status(400).send(response + "" + error);
        }
    }

    async updateRoute(request: Request, response: Response) {
        try {
            const routeId: number = parseInt(request.params.routeId, 10);
            const routeData: RouteCommand = request.body;
            const updatedRoute: RouteResponse = await this.routesService.updateRoute(routeId);
            return response.status(200).send(updatedRoute);
        } catch (error) {
            return response.status(400).send(response + "" + error);
        }
    }
}