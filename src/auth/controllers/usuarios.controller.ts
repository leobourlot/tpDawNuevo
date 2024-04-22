import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UsuariosService } from "../services/usuarios.services";
import { Roles } from "../decorators/roles.decorator";
import { RolesEnum } from "../enums/roles-enum";
import { AuthGuard } from "../guards/auth.guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioDto } from "../dtos/usuario.dto";


@Controller("/usuarios")
export class UsuariosController {

    constructor(private usuariosService: UsuariosService) {

    }

    @Get()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    async getUsuarios() {
        return await this.usuariosService.obtenerUsuarios();
    }
    
    @Get(":idUsuario")
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    async getUsuarioPorId(@Param("idUsuario") idUsuario: number) {
        return await this.usuariosService.findOneById(idUsuario);
    }
    
    @Get("nombreUsuario/:nombreUsuario")
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    async getUsuarioPorNombreUsuario(@Param("nombreUsuario") nombreUsuario: string) {
        return await this.usuariosService.obtenerUsuarioPorNombreDeUsuario(nombreUsuario);
    }
    
    @Get("dni/:dni")
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    async getUsuarioPorDni(@Param("dni") dni: string) {
        return await this.usuariosService.obtenerUsuarioPorDni(dni);
    }
    
    @Delete("eliminar/:idUsuario")
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    async eliminarUsuario(@Param("idUsuario") idUsuario: number) {
        return await this.usuariosService.eliminarUsuario(idUsuario);
    }

    @Post()
    async postUsuarioNuevo(@Body() nuevoUsuario: UsuarioDto) {
        return await this.usuariosService.registroUsuario(nuevoUsuario);
    }

}