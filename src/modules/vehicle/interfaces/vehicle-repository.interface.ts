import VehicleCommand from "../dto/commands/vehicle.command";
import VehicleResponse from "../dto/responses/vehicle.response";

export interface IVehicleRepository {
    findAll(): Promise<VehicleResponse[] | null>;
    findVehicleByResponsibleId(responsibleId: number): Promise<VehicleResponse[] | null>;
    createVehicle(vehicle: VehicleCommand): Promise<VehicleResponse>;
    deleteVehicle(vehicleId: number): Promise<boolean>;
}