import VehicleCommand from "../dto/commands/vehicle.command";
import VehicleResponse from "../dto/responses/vehicle.response";

export interface IVehicleService {
    createVehicle(vehicle: VehicleCommand): Promise<VehicleResponse>;
    findAll(): Promise<VehicleResponse[] | null>;
    findVehicleByResponsibleId(responsibleId: number): Promise<VehicleResponse[] | null>;
    deleteVehicle(vehicleId: number): Promise<boolean>;
}