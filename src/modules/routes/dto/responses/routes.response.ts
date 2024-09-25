import VehicleResponse from "@/modules/vehicle/dto/responses/vehicle.response";
import { Alerts, User } from "prisma/generated/client";

export interface RouteResponse {
    id: number,
    name: string,
    geofencinginfos: string,
    startAddress: string,
    finishAddress: string,
    creatorid: string,
    vehicle: VehicleResponse,
    user: User,
    status: string,
    alerts: Alerts
}