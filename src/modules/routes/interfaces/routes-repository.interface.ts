import { RouteCommand } from "../dto/commands/routes.command";
import { RouteResponse } from "../dto/responses/routes.response";


export interface IRoutesRepository {
    createRoute(route: RouteCommand): Promise<RouteResponse>;
    findAll(): Promise<RouteResponse[]>;
}