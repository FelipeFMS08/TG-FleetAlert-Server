import { PrismaClient } from "@prisma/client";
import { IAlertsRepository } from "../interfaces/alerts-repository.interface";
import { AlertCommand } from "../dto/command/alert.command";
import { AlertResponse } from "../dto/response/alerts.response";


export class AlertsRepository implements IAlertsRepository {
    constructor(private prisma: PrismaClient) {}

    async createAlert(alert: AlertCommand): Promise<AlertResponse> {
        const createdAlert = await this.prisma.alerts.create({
            data: alert,
        });
        return createdAlert as AlertResponse;
    }

    async findAllAlerts(): Promise<AlertResponse[]> {
        return await this.prisma.alerts.findMany();
    }

    async findAlertById(alertId: number): Promise<AlertResponse | null> {
        return await this.prisma.alerts.findUnique({
            where: { id: alertId },
        }) as AlertResponse | null;
    }

    async updateAlert(alertId: number, alert: AlertCommand): Promise<AlertResponse> {
        return await this.prisma.alerts.update({
            where: { id: alertId },
            data: alert,
        }) as AlertResponse;
    }

    async deleteAlert(alertId: number): Promise<boolean> {
        try {
            await this.prisma.alerts.delete({
                where: { id: alertId },
            });
            return true;
        } catch (error) {
            return false; 
        }
    }

    async findAlertByRouteId(routeId: number): Promise<AlertResponse[]> {
        return await this.prisma.alerts.findMany({
            where: {
                routeId: routeId
            }
        })
    }

}