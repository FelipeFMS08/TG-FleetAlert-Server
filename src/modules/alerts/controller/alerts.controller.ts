import { Request, Response } from "express";
import { AlertsService } from "../service/alerts.service";
import { AlertCommand } from "../dto/command/alert.command";
import { AlertResponse } from "../dto/response/alerts.response";

export class AlertsController {
    constructor(private alertsService: AlertsService) {}

    async createAlert(req: Request, res: Response): Promise<Response> {
        try {
            const alertData: AlertCommand = req.body;
            const createdAlert: AlertResponse = await this.alertsService.createAlert(alertData);
            return res.status(201).json(createdAlert);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async findAllAlerts(req: Request, res: Response): Promise<Response> {
        try {
            const alerts: AlertResponse[] = await this.alertsService.findAllAlerts();
            return res.status(200).json(alerts);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async findAlertById(req: Request, res: Response): Promise<Response> {
        try {
            const alertId: number = parseInt(req.params.alertId, 10);
            const alert: AlertResponse | null = await this.alertsService.findAlertById(alertId);
            if (!alert) {
                return res.status(404).json({ message: "Alert not found" });
            }
            return res.status(200).json(alert);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async updateAlert(req: Request, res: Response): Promise<Response> {
        try {
            const alertId: number = parseInt(req.params.alertId, 10);
            const alertData: AlertCommand = req.body;
            const updatedAlert: AlertResponse = await this.alertsService.updateAlert(alertId, alertData);
            return res.status(200).json(updatedAlert);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async deleteAlert(req: Request, res: Response): Promise<Response> {
        try {
            const alertId: number = parseInt(req.params.alertId, 10);
            const isDeleted: boolean = await this.alertsService.deleteAlert(alertId);
            if (!isDeleted) {
                return res.status(404).json({ message: "Alert not found" });
            }
            return res.status(204).send(); // Retorna 204 No Content
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    private handleError(res: Response, error: any): Response {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
