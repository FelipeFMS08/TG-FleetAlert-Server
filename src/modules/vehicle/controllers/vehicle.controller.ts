import { PrismaClient } from "../../../../prisma/generated/client";
import { VehicleService } from "../services/vehicle.service";
import { VehicleRepository } from "../repositories/vehicle.repository";
import VehicleCommand from "../dto/commands/vehicle.command";
import { Request, Response } from "express";


export class VehicleController {
    private vehicleService: VehicleService;

    constructor() {
        const prisma = new PrismaClient();
        const vehicleRepository = new VehicleRepository(prisma);

        this.vehicleService = new VehicleService(vehicleRepository);
    }

    async createVehicle(req: Request, res: Response) {
        const vehicleCommand: VehicleCommand = req.body as unknown as VehicleCommand;
        try {
            const response = await this.vehicleService.createVehicle(vehicleCommand);
            res.status(201).send(response);
        } catch(error) {
            res.status(500).send(error);
        }
     }

    async findAll(req: Request, res: Response) {
        try {
            const response = await this.vehicleService.findAll();
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async findByResponsibleId(req: Request, res: Response) {
        const responsibleId  = req.params.id;
        try {
            const response = await this.vehicleService.findVehicleByResponsibleId(Number(responsibleId));
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async deleteVehicle(req: Request, res: Response) {
        const vehicleId = req.params.id;
        try {
            const response = await this.vehicleService.deleteVehicle(Number(vehicleId));
            res.status(200).send(response);
        } catch (error){
            res.status(500).send(error);
        }
    }
}