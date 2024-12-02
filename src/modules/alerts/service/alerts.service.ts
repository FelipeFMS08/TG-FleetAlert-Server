import { AlertCommand } from "../dto/command/alert.command";
import { AlertResponse } from "../dto/response/alerts.response";
import { IAlertsRepository } from "../interfaces/alerts-repository.interface";
import { IAlertsService } from "../interfaces/alerts-service.interface";
import CryptoJS from 'crypto-js';

export class AlertsService implements IAlertsService {
    constructor(private alertsRepository: IAlertsRepository) {}

    async createAlert(alert: AlertCommand): Promise<AlertResponse> {
        const secretKey = process.env.SECRET_CRYPT?.toString() || "DEFAULT CRYPT";
        alert.location = this.encrypt(alert.location, secretKey);
        return await this.alertsRepository.createAlert(alert);
    }

    async findAlertByRouteId(routeId: number): Promise<AlertResponse[]> {
        const secretKey = process.env.SECRET_CRYPT?.toString() || "DEFAULT CRYPT";
        const alerts = await this.alertsRepository.findAlertByRouteId(routeId);

        if (alerts) {
            alerts.forEach(alert => alert.location = this.decrypt(alert.location, secretKey));
        }

        return alerts;
    }

    async findAllAlerts(): Promise<AlertResponse[]> {
        const secretKey = process.env.SECRET_CRYPT?.toString() || "DEFAULT CRYPT";
        const alerts = await this.alertsRepository.findAllAlerts();

        if (alerts) {
            alerts.forEach(alert => alert.location = this.decrypt(alert.location, secretKey));
        }

        return alerts;

    }

    async findAlertById(alertId: number): Promise<AlertResponse | null> {
        return await this.alertsRepository.findAlertById(alertId);
    }

    async updateAlert(alertId: number, alert: AlertCommand): Promise<AlertResponse> {
        return await this.alertsRepository.updateAlert(alertId, alert);
    }

    async deleteAlert(alertId: number): Promise<boolean> {
        return await this.alertsRepository.deleteAlert(alertId);
    }

    encrypt(text: string, secretKey: string): string {
        return CryptoJS.AES.encrypt(text, secretKey).toString();
    }
    
    decrypt(encryptedText: string, secretKey: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
