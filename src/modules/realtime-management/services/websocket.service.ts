import { AlertsRepository } from "@/modules/alerts/repository/alerts.repository";
import { AlertsService } from "@/modules/alerts/service/alerts.service";
import { RouteResponse } from "@/modules/routes/dto/responses/routes.response";
import { IRoutesRepository } from "@/modules/routes/interfaces/routes-repository.interface";
import { RoutesRepository } from "@/modules/routes/repositories/routes.repository";
import { RoutesService } from "@/modules/routes/services/routes.service";
import { PrismaClient } from "prisma/generated/client";
import { Server, Socket } from "socket.io";

export class WebSocketService {
  private io: Server;
  private userConnections = new Map<string, string>();
  private managerConnections = new Map<string, string>();
  private routesToManagement = new Map<number, RouteResponse>();
  private routesService: RoutesService;
  private alertsService: AlertsService;

  constructor(server: any) {
    this.io = new Server(server, {
      cors: { origin: "*", methods: ["GET", "POST"] },
    });
    const prisma = new PrismaClient();
    const routesRepository = new RoutesRepository(prisma);
    this.routesService = new RoutesService(routesRepository);
    const alertsRepository = new AlertsRepository(prisma);
    this.alertsService = new AlertsService(alertsRepository);
  }

  async initialize(): Promise<void> {
    try {
      const routes = await this.routesService.findAll();
      routes?.forEach(route => this.routesToManagement.set(route.id, route));
      console.log(routes);

      console.log("WebSocket Inicializado com Sucesso!")
      this.io.on("connection", (socket: Socket) => {

        socket.on("register", ({ userId, isManager }) => {
          if (isManager) {
            this.managerConnections.set(userId, socket.id);
            console.log(`Gestor conectado: ${socket.id}`);
          } else {
            this.userConnections.set(userId, socket.id);
            console.log(`Usuário conectado: ${socket.id}`);
          }
        });

        socket.on("disconnect", () => {
          this.removeConnection(socket.id);
        });

        socket.on("locationUpdate", async (data: any) => {
          const { routeId, location, userId, status } = data;
          console.log(data)
          await this.routesService.updateRouteStatus(routeId, status);

          const isOutside = this.isOutsideGeofencing(routeId, location);
          const managerSocketId = this.getManagerSocketIdForUser(this.routesToManagement.get(routeId)!.creatorid);
          const routeName = this.routesToManagement.get(routeId)!.name;


          if (isOutside) {
            const locationString = JSON.stringify(location);
            const alert = await this.alertsService.createAlert({ routeId, location: locationString });
            if (managerSocketId) {
              this.io.to(managerSocketId).emit("alert", {
                id: alert.id,
                message: "Usuário fora da área delimitada",
                userId,
                routeId,
                routeName,
                location,
                status
              });
              this.io.to(managerSocketId).emit("userLocation", { routeId, location, status });
            }
          } else {
            if (managerSocketId) {
              this.io.to(managerSocketId).emit("userLocation", { routeId, location, status });
            }
          }
        });
      });
    } catch (error) {
      console.error("Erro ao carregar as rotas:", error);
    }
  }

  private getManagerSocketIdForUser(userId: string): string | undefined {
    return this.managerConnections.get(userId);
  }

  private removeConnection(socketId: string) {
    this.userConnections.forEach((id, key) => {
      if (id === socketId) this.userConnections.delete(key);
    });
    this.managerConnections.forEach((id, key) => {
      if (id === socketId) this.managerConnections.delete(key);
    });
  }

  isOutsideGeofencing(routeId: number, location: { latitude: number, longitude: number }): boolean {
    const geofencingArea = this.routesToManagement.get(routeId)?.geofencinginfos;
    if (!geofencingArea) {
      return false;
    }
    const geofencingCoordinates = JSON.parse(geofencingArea!).map(
      (point: { lat: number; lng: number }) => ({
        latitude: point.lat,
        longitude: point.lng,
      })
    );

    return !this.isPointInPolygon(location, geofencingCoordinates);
  }

  isPointInPolygon(point: { latitude: number, longitude: number }, polygon: { latitude: number, longitude: number }[]): boolean {
    let inside = false;
    const { latitude: x, longitude: y } = point;
    const n = polygon.length;

    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = polygon[i].latitude, yi = polygon[i].longitude;
      const xj = polygon[j].latitude, yj = polygon[j].longitude;

      const onEdge = (y === yi || y === yj) && x >= Math.min(xi, xj) && x <= Math.max(xi, xj);
      if (onEdge) {
        return true;
      }

      const intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }

}
