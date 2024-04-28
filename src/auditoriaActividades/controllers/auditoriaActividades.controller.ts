import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuditoriaActividadesService } from "../services/auditoriaActividades.services";
import { AuthModule } from "src/auth/auth.module";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesEnum } from "src/auth/enums/roles-enum";
import { Usuario } from "src/auth/entities/usuario.entity";

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

    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get('/actividadesModificadas')
    async obtenerModificaciones(){
        return await this.auditoriaActividadesService.obtenerModificaciones();
    }

    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get('/actividadesFinalizadas')
    async obtenerFinalizadas(){
        return await this.auditoriaActividadesService.obtenerFinalizadas();
    }
    
    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get('/actividadesUsuario/:id')
    async obtenerActividadesUsuario(idUsuarioModificacion: Usuario){
        return await this.auditoriaActividadesService.obtenerActividadesUsuario(idUsuarioModificacion);
    }
        


}