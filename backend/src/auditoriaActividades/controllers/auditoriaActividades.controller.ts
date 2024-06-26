import { Controller, Get, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { AuditoriaActividadesService } from "../services/auditoriaActividades.services";
import { AuthModule } from "src/auth/auth.module";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesEnum } from "src/auth/enums/roles-enum";
import { Usuario } from "src/auth/entities/usuario.entity";
import { UsuariosService } from "src/auth/services/usuarios.services";

@Controller('/auditoriaActividades')
export class AuditoriaActividadesController {

    constructor(private auditoriaActividadesService: AuditoriaActividadesService, private usuariosService: UsuariosService) {

    }

    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get()
    async obtenerAuditoriasActividades() {
        return await this.auditoriaActividadesService.obtenerAuditoriasActividades();
    }

    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get('/actividadesModificadas')
    async obtenerModificaciones() {
        return await this.auditoriaActividadesService.obtenerModificaciones();
    }

    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get('/actividadesFinalizadas')
    async obtenerFinalizadas() {
        return await this.auditoriaActividadesService.obtenerFinalizadas();
    }
    
    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get('/actividadesPendientes')
    async obtenerPendientes() {
        return await this.auditoriaActividadesService.obtenerPendientes();
    }
    
    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get('/actividadesEliminadas')
    async obtenerEliminadas() {
        return await this.auditoriaActividadesService.obtenerEliminadas();
    }

    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get('/actividadesUsuario/:id')
    async obtenerActividadesUsuario(@Param('id') id: number) {
        const usuario: Usuario = await this.usuariosService.findOneById(id);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return await this.auditoriaActividadesService.obtenerActividadesUsuario(usuario);
    }

    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get('/actividadesPendientesUsuario/:id')
    async obtenerActividadesPendientesUsuario(@Param('id') id: number) {
        const usuario: Usuario = await this.usuariosService.findOneById(id);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return await this.auditoriaActividadesService.obtenerActividadesPendientesUsuario(usuario);
    }
    
    @UseGuards(AuthModule)
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @Get('/actividadesEliminadasUsuario/:id')
    async obtenerActividadesEliminadasUsuario(@Param('id') id: number) {
        const usuario: Usuario = await this.usuariosService.findOneById(id);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return await this.auditoriaActividadesService.obtenerActividadesEliminadasUsuario(usuario);
    }

    // async obtenerActividadesUsuario(idUsuarioModificacion: Usuario){
    //     return await this.auditoriaActividadesService.obtenerActividadesUsuario(idUsuarioModificacion);
    // }



}