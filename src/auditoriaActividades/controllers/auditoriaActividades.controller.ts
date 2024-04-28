import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuditoriaActividadesService } from "../services/auditoriaActividades.services";
import { AuthModule } from "src/auth/auth.module";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesEnum } from "src/auth/enums/roles-enum";

@Controller('/auditoriaActividades')
export class AuditoriaActividadesController{

    constructor(private auditoriaActividadesService: AuditoriaActividadesService) {

    }

    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get()
    async obtenerAuditoriasActividades(){
        return await this.auditoriaActividadesService.obtenerAuditoriasActividades();
    }
        


}