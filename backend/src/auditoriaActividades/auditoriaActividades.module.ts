import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Actividad } from "src/actividades/entities/actividad.entity";
import { AuthModule } from "src/auth/auth.module";
import { Usuario } from "src/auth/entities/usuario.entity";
import { AuditoriaActividadesController } from "./controllers/auditoriaActividades.controller";
import { AuditoriaActividadesService } from "./services/auditoriaActividades.services";
import { AuditoriaActividades } from "./entities/auditoriaActividades.entity";

@Module({
    controllers: [AuditoriaActividadesController],
    providers: [AuditoriaActividadesService],
    imports: [TypeOrmModule.forFeature([Usuario, Actividad, AuditoriaActividades]), AuthModule],
    exports: []
})
export class AuditoriaActividadesModule{
    
}