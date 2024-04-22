import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "src/auth/entities/usuario.entity";
import { ActividadesController } from "./controllers/actividades.controller";
import { ActividadesService } from "./services/actividades.service";


@Module({
    controllers: [ActividadesController],
    providers: [ActividadesService],
    imports: [TypeOrmModule.forFeature([Usuario])],
    exports: []
})
export class ActividadesModule{

}