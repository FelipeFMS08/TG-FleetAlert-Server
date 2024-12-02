import { RouteCommand } from "../dto/commands/routes.command";
import { RouteResponse, RouteTrackingResponse } from "../dto/responses/routes.response";
import { IRoutesRepository } from "../interfaces/routes-repository.interface";
import { IRoutesService } from "../interfaces/routes-service.interface";
import CryptoJS from 'crypto-js';

export class RoutesService implements IRoutesService {

    constructor(private routeRepository: IRoutesRepository){}

    async createRoute(route: RouteCommand): Promise<RouteResponse> {
        const secretKey = process.env.SECRET_CRYPT?.toString() || "DEFAULT CRYPT";

        route.geofencinginfos = this.encrypt(route.geofencinginfos, secretKey);
        route.startAddress = this.encrypt(route.startAddress, secretKey);
        route.finishAddress = this.encrypt(route.finishAddress, secretKey);

        const newRoute = await this.routeRepository.createRoute(route);

        newRoute.geofencinginfos = this.decrypt(newRoute.geofencinginfos, secretKey);
        newRoute.startAddress = this.decrypt(newRoute.startAddress, secretKey);
        newRoute.finishAddress = this.decrypt(newRoute.finishAddress, secretKey);

        return newRoute;
    }
    async findAll(): Promise<RouteResponse[] | null> {
        const secretKey = process.env.SECRET_CRYPT?.toString() || "DEFAULT CRYPT";
        const routes = await this.routeRepository.findAll();

        if (routes) {
            routes.forEach(route => {
                try {
                    route.geofencinginfos = this.decrypt(route.geofencinginfos, secretKey);
                } catch (error) {
                    console.error("Error decrypting geofencinginfos:", error);
                }
                try {
                    route.startAddress = this.decrypt(route.startAddress, secretKey);
                } catch (error) {
                    console.error("Error decrypting startAddress:", error);
                }
                try {
                    route.finishAddress = this.decrypt(route.finishAddress, secretKey);
                } catch (error) {
                    console.error("Error decrypting finishAddress:", error);
                }
            });
        }


        return routes;
    }

    async findRouteByManagerId(managerId: string): Promise<RouteTrackingResponse[] | null> {
        const secretKey = process.env.SECRET_CRYPT?.toString() || "DEFAULT CRYPT";
        const routes = await this.routeRepository.findRouteByManagerId(managerId);

        if (routes) {
            routes.forEach(routeInfo => {        
                routeInfo.route.geofencinginfos = this.decrypt(routeInfo.route.geofencinginfos, secretKey);
                routeInfo.route.startAddress = this.decrypt(routeInfo.route.startAddress, secretKey);
                routeInfo.route.finishAddress = this.decrypt(routeInfo.route.finishAddress, secretKey);
                routeInfo.route.alerts.forEach(alert => alert.location = this.decrypt(alert.location, secretKey));
            });
        }

        return routes;
    }

    async findRouteByUserId(userId: string): Promise<RouteTrackingResponse[] | null> {
        const secretKey = process.env.SECRET_CRYPT?.toString() || "DEFAULT CRYPT";
        const routes = await this.routeRepository.findRouteByUserId(userId);

        if (routes) {
            routes.forEach(routeInfo => {        
                routeInfo.route.geofencinginfos = this.decrypt(routeInfo.route.geofencinginfos, secretKey);
                routeInfo.route.startAddress = this.decrypt(routeInfo.route.startAddress, secretKey);
                routeInfo.route.finishAddress = this.decrypt(routeInfo.route.finishAddress, secretKey);
                routeInfo.route.alerts.forEach(alert => alert.location = this.decrypt(alert.location, secretKey));
            });
        }

        return routes;
    }
    
    async deleteRoute(routeId: number): Promise<boolean> {
        return await this.routeRepository.deleteRoute(routeId);
    }
    updateRoute(routeId: number): Promise<RouteResponse> {
        throw new Error("Method not implemented.");
    }

    async updateRouteStatus(routeId: number, status: string): Promise<RouteResponse> {
        return await this.routeRepository.updateRouteStatus(routeId, status);
    }

    encrypt(text: string, secretKey: string): string {
        return CryptoJS.AES.encrypt(text, secretKey).toString();
    }
    
    decrypt(encryptedText: string, secretKey: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
    
}