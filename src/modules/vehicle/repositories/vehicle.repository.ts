import { PrismaClient } from "@prisma/client";
import VehicleCommand from "../dto/commands/vehicle.command";
import { IVehicleRepository } from "../interfaces/vehicle-repository.interface";
import VehicleResponse from "../dto/responses/vehicle.response";

export class VehicleRepository implements IVehicleRepository {
    constructor(private prisma: PrismaClient) {}
    
    async findAll(): Promise<VehicleResponse[] | null> {
        const vehicles = await this.prisma.vehicle.findMany({
            include: {
              responsible: {
                select: {
                  name: true, 
                },
              },
            },
          });
          
          const vehiclesWithResponsibleName = vehicles.map((vehicle: any) => ({
            ...vehicle,
            responsible: vehicle.responsible.name,  
          }));
          
          return vehiclesWithResponsibleName;
    }
    
    async findVehicleByResponsibleId(userId: number): Promise<VehicleResponse[] | null> {
        return await this.prisma.vehicle.findMany({
            where: { idResponsibleid: userId}
        })
    }

    async createVehicle(vehicle: VehicleCommand): Promise<VehicleResponse> {
        return await this.prisma.vehicle.create({ data: vehicle });
    }

    async deleteVehicle(vehicleId: number): Promise<boolean> {
        return await this.prisma.vehicle.delete({ id: vehicleId});
    }

}