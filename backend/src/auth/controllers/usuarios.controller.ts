import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsuariosService } from "../services/usuarios.services";
import { Roles } from "../decorators/roles.decorator";
import { RolesEnum } from "../enums/roles-enum";
import { AuthGuard } from "../guards/auth.guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioDto } from "../dtos/usuario.dto";
import { ActualizarUsuarioDto } from "../dtos/actualizarUsuario.dto";


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

    @Post("nuevo")
    async postUsuarioNuevo(@Body() nuevoUsuario: UsuarioDto) {
        return await this.usuariosService.registroUsuario(nuevoUsuario);
    }

    @Put("modificar/:id")
    async actualizarUsuario(@Param('id') id: number,
        @Body() usuarioActualizado: ActualizarUsuarioDto,
    ) {
        return await this.usuariosService.actualizarUsuario(id, usuarioActualizado);
    }

}