import { AlertCommand } from "../dto/command/alert.command";
import { AlertResponse } from "../dto/response/alerts.response";

export interface IAlertsService {
    createAlert(alert: AlertCommand): Promise<AlertResponse>;
    findAllAlerts(): Promise<AlertResponse[]>;
    findAlertById(alertId: number): Promise<AlertResponse | null>;
    updateAlert(alertId: number, alert: AlertCommand): Promise<AlertResponse>;
    deleteAlert(alertId: number): Promise<boolean>;
    findAlertByRouteId(routeId: number): Promise<AlertResponse[]>;
}