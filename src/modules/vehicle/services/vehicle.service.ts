import VehicleCommand from "../dto/commands/vehicle.command";
import VehicleResponse from "../dto/responses/vehicle.response";
import { IVehicleRepository } from "../interfaces/vehicle-repository.interface";
import { IVehicleService } from "../interfaces/vehicle-service.interface";


export class VehicleService implements IVehicleService {

    constructor(private vehicleRepository: IVehicleRepository){}

    async createVehicle(vehicle: VehicleCommand): Promise<void> {
        await this.vehicleRepository.createVehicle(vehicle);
    }
    async findAll(): Promise<VehicleResponse[] | null> {
        return await this.vehicleRepository.findAll();
    }
    async findByUserId(userId: string): Promise<VehicleResponse[] | null> {
        return await this.vehicleRepository.findVehicleByUserId(userId);
    }

}