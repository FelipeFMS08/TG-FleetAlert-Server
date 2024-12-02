import { RouteCommand } from "../dto/commands/routes.command";
import { RouteResponse, RouteTrackingResponse } from "../dto/responses/routes.response";

export interface IRoutesService {
    createRoute(route: RouteCommand): Promise<RouteResponse>;
    findAll(): Promise<RouteResponse[] | null>;
    findRouteByUserId(userId: string): Promise<RouteTrackingResponse[] | null>;
    findRouteByManagerId(managerId: string): Promise<RouteTrackingResponse[] | null>;
    deleteRoute(routeId: number): Promise<boolean>;
    updateRoute(routeId: number): Promise<RouteResponse>;
}