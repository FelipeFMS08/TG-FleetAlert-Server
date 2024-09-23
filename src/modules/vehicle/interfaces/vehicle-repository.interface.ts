import { Vehicle } from "@prisma/client";
import VehicleCommand from "../dto/commands/vehicle.command";
import VehicleResponse from "../dto/responses/vehicle.response";

export interface IVehicleRepository {
    findAll(): Promise<VehicleResponse[] | null>;
    findVehicleByUserId(userId: string): Promise<VehicleResponse[] | null>;
    createVehicle(vehicle: VehicleCommand): Promise<void>;
}