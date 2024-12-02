import { AlertResponse } from "@/modules/alerts/dto/response/alerts.response";
import { UserInfosResponse } from "@/modules/users/dto/responses/users-info.response";
import VehicleResponse from "@/modules/vehicle/dto/responses/vehicle.response";

export interface RouteResponse {
    id: number,
    name: string,
    geofencinginfos: string,
    startAddress: string,
    finishAddress: string,
    creatorid: string,
    creator: string,
    vehicle: VehicleResponse,
    user: string,
    status: string,
    alerts: AlertResponse[]
}

export interface RouteTrackingResponse {
    route: RouteResponse;
    user: UserInfosResponse;
    vehicle: VehicleResponse;
}