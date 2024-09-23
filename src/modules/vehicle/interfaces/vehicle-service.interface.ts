import VehicleCommand from "../dto/commands/vehicle.command";
import VehicleResponse from "../dto/responses/vehicle.response";

export interface IVehicleService {
    createVehicle(vehicle: VehicleCommand): Promise<void>;
    findAll(): Promise<VehicleResponse[] | null>;
    findByUserId(userId: string): Promise<VehicleResponse[] | null>;
}