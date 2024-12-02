import { PrismaClient } from "@prisma/client";
import { IRoutesRepository } from "../interfaces/routes-repository.interface";
import { RouteCommand } from "../dto/commands/routes.command";
import { RouteResponse, RouteTrackingResponse } from "../dto/responses/routes.response";
import { Alerts, Routes } from "prisma/generated/client";
import VehicleResponse from "@/modules/vehicle/dto/responses/vehicle.response";
import { UserInfosResponse } from "@/modules/users/dto/responses/users-info.response";
import { AlertResponse } from "@/modules/alerts/dto/response/alerts.response";


export class RoutesRepository implements IRoutesRepository {

    constructor(private prisma: PrismaClient) { }


    async createRoute(route: RouteCommand): Promise<RouteResponse> {
        return await this.prisma.routes.create({ data: route });
    }
    async findAll(): Promise<RouteResponse[]> {
        const routes = await this.prisma.routes.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const routesWithCreator = await Promise.all(
            routes.map(async (route: Routes) => {
                const creator = await this.prisma.user.findUnique({
                    where: {
                        id: route.creatorid,
                    },
                    select: {
                        name: true,
                    },
                });

                return {
                    ...route,
                    creator: creator ? creator.name : "Desconhecido",
                };
            })
        );

        const routesFinnaly = routesWithCreator.map((route: any) => ({
            ...route,
            user: route.user.name,
        }));

        return routesFinnaly;
    }

    async findRouteByUserId(userId: string): Promise<RouteTrackingResponse[] | null> {
        const routes = await this.prisma.routes.findMany({
            where: {
                userId: userId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        id: true, // Adicionado o id do usuário
                        email: true,
                        role: true,
                        photo: true,
                    },
                },
                vehicle: true, // Inclui o veículo completo
                Alerts: true, // Inclui os alerts
            },
        });
    
        const routesWithCreator = await Promise.all(
            routes.map(async (route: any) => {
                // Busca o criador pela creatorId
                const creator = await this.prisma.user.findUnique({
                    where: { id: route.creatorid },
                    select: { name: true },
                });
    
                // Retorna a rota com as informações do criador
                return {
                    ...route,
                    creator: creator ? creator.name : "Desconhecido",
                };
            })
        );
    
        // Mapeando as rotas para ajustar a estrutura conforme RouteTrackingResponse
        return routesWithCreator.map((route: any) => ({
            route: {
                id: route.id,
                name: route.name,
                geofencinginfos: route.geofencinginfos,
                startAddress: route.startAddress,
                finishAddress: route.finishAddress,
                creatorid: route.creatorid, // Garantir que creatorid está presente
                creator: route.creator, // Nome do criador
                user: route.user.name, // Nome do usuário da rota
                status: route.status,
                alerts: route.Alerts.filter((alert: { routeId: any }) => alert.routeId === route.id).map((alert: AlertResponse) => ({
                    id: alert.id,
                    location: alert.location,
                    routeId: alert.routeId,
                })),
                vehicle: {
                    id: route.vehicle.id,
                    name: route.vehicle.name,
                    signSerial: route.vehicle.signSerial,
                    type: route.vehicle.type,
                    responsibleId: route.vehicle.responsibleId,
                } as VehicleResponse, // Garantir que a estrutura de vehicle está correta
            },
            user: {
                id: route.user.id,
                name: route.user.name,
                email: route.user.email,
                role: route.user.role,
                photo: route.user.photo,
            } as UserInfosResponse, // Garantir que a estrutura de user está correta
            vehicle: {
                id: route.vehicle.id,
                name: route.vehicle.name,
                signSerial: route.vehicle.signSerial,
                type: route.vehicle.type,
                responsibleId: route.vehicle.responsibleId,
            } as VehicleResponse, // Garantir que a estrutura de vehicle está correta
        }));
    }
    
    


    async findRouteByManagerId(managerId: string): Promise<RouteTrackingResponse[] | null> {
        const routes = await this.prisma.routes.findMany({
            where: {
                creatorid: managerId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        id: true, // Adicionado o id do usuário
                        email: true,
                        role: true,
                        photo: true,
                    },
                },
                vehicle: true, // Inclui o veículo completo
                Alerts: true, // Inclui os alerts
            },
        });
    
        const routesWithCreator = await Promise.all(
            routes.map(async (route: any) => {
                // Busca o criador pela creatorId
                const creator = await this.prisma.user.findUnique({
                    where: { id: route.creatorid },
                    select: { name: true },
                });
    
                // Retorna a rota com as informações do criador
                return {
                    ...route,
                    creator: creator ? creator.name : "Desconhecido",
                };
            })
        );
    
        // Mapeando as rotas para ajustar a estrutura conforme RouteTrackingResponse
        return routesWithCreator.map((route: any) => ({
            route: {
                id: route.id,
                name: route.name,
                geofencinginfos: route.geofencinginfos,
                startAddress: route.startAddress,
                finishAddress: route.finishAddress,
                creatorid: route.creatorid, // Garantir que creatorid está presente
                creator: route.creator, // Nome do criador
                user: route.user.name, // Nome do usuário da rota
                status: route.status,
                alerts: route.Alerts.filter((alert: { routeId: any }) => alert.routeId === route.id).map((alert: AlertResponse) => ({
                    id: alert.id,
                    location: alert.location,
                    routeId: alert.routeId,
                })),
                vehicle: {
                    id: route.vehicle.id,
                    name: route.vehicle.name,
                    signSerial: route.vehicle.signSerial,
                    type: route.vehicle.type,
                    responsibleId: route.vehicle.responsibleId,
                } as VehicleResponse, // Garantir que a estrutura de vehicle está correta
            },
            user: {
                id: route.user.id,
                name: route.user.name,
                email: route.user.email,
                role: route.user.role,
                photo: route.user.photo,
            } as UserInfosResponse, // Garantir que a estrutura de user está correta
            vehicle: {
                id: route.vehicle.id,
                name: route.vehicle.name,
                signSerial: route.vehicle.signSerial,
                type: route.vehicle.type,
                responsibleId: route.vehicle.responsibleId,
            } as VehicleResponse, // Garantir que a estrutura de vehicle está correta
        }));
    }

    async deleteRoute(routeId: number): Promise<boolean> {
        return await this.prisma.routes.delete({
            where: {
                id: routeId,
            },
        });
    }
    async updateRoute(routeId: number): Promise<RouteResponse> {
        throw new Error("Method not implemented.");
    }

    async updateRouteStatus(routeId: number, status: string): Promise<RouteResponse> {
        return await this.prisma.routes.update({
            where: {
                id: routeId,
            },
            data: {
                status: status
            }
        })
    }


}