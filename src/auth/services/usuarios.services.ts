import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import { EstadosUsuarioEnum } from "../enums/estado-Usuario.enum";
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from "../dtos/usuario.dto";



@Injectable()
export class UsuariosService {

    constructor(@InjectRepository(Usuario) private usuariosRepo: Repository<Usuario>) {

    }

    async obtenerUsuarioPorNombreDeUsuario(
        nombreUsuario: string,
    ): Promise<Usuario> {
        const usuario: Usuario = await this.usuariosRepo.findOne({
            where: {
                nombreUsuario: nombreUsuario,
                estado: EstadosUsuarioEnum.ACTIVO
            },
        });
        return usuario
    }

    async obtenerUsuarioPorDni(
        dni: string,
    ): Promise<Usuario> {
        const usuario: Usuario = await this.usuariosRepo.findOne({
            where: {
                dni: dni,
                estado: EstadosUsuarioEnum.ACTIVO
            },
        });
        return usuario
    }

    async obtenerUsuarios(): Promise<Usuario[]> {
        const usuarios: Usuario[] = await this.usuariosRepo.find({
            where: {
                estado: EstadosUsuarioEnum.ACTIVO,
            },
        });
        return usuarios
    }

    async findOneById(idUsuario: number): Promise<Usuario> {
        const usuario = await this.usuariosRepo.findOne({
            where: {
                idUsuario,
                estado: EstadosUsuarioEnum.ACTIVO,
            },
        });
        if (!usuario) {
            throw new UnauthorizedException('No existe un usuario con ese id de usuario.');
        }
        return usuario
    }

    async eliminarUsuario(idUsuario: number): Promise<Usuario> {
        const usuario = await this.usuariosRepo.findOne({
            where: {
                idUsuario,
                estado: EstadosUsuarioEnum.ACTIVO,
            },
        });
        if (!usuario) {
            throw new UnauthorizedException('No existe un usuario con ese id de usuario.');
        }

        usuario.estado = EstadosUsuarioEnum.BAJA;

        return await this.usuariosRepo.save(usuario);

    }

    async registroUsuario(datosNuevoUsuario: UsuarioDto): Promise<Usuario> {
        const { dni, email, clave, nombreUsuario, apellido, nombres, rol } = datosNuevoUsuario

        // Verificar si el usuario ya existe
        const usuarioExistente = await this.usuariosRepo.findOne({
            where: { dni }
        });

        if (usuarioExistente) {
            throw new BadRequestException('El DNI ingresado ya está registrado.');
        }

        // Encriptar la clave
        const claveCifrada = await bcrypt.hash(clave, 10);

        // Crear un nuevo usuario
        const nuevoUsuario = this.usuariosRepo.create({
            dni,
            email,
            clave: claveCifrada,
            nombreUsuario,
            apellido,
            nombres,
            estado: EstadosUsuarioEnum.ACTIVO,
            rol,
        });

        // Guardar el nuevo usuario en la base de datos
        try {
            await this.usuariosRepo.save(nuevoUsuario);
        } catch (error) {
            throw new BadRequestException('Error al registrar el usuario.');
        }

        return nuevoUsuario
    }

    async actualizarUsuario(id: number, usuarioDto: UsuarioDto) {
        const {dni, email, clave, nombreUsuario, apellido, nombres, rol} = usuarioDto;
        const usuario = await this.usuariosRepo.findOne({
            where: {
                idUsuario: id,
            },
        });

        if (!usuario) {
            throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
        }

        console.log(apellido);

        if (dni !== undefined) {
            usuarioDto.dni = usuario.dni;
        }
        if (email !== undefined) {
            usuarioDto.email = usuario.email;
        }
        if (clave !== undefined) {
            usuarioDto.clave = usuario.clave;
        }
        if (nombreUsuario !== undefined) {
            usuarioDto.nombreUsuario = usuario.nombreUsuario;
        }
        if (apellido !== undefined) {
            usuarioDto.apellido = usuario.apellido;
        }
        if (nombres !== undefined) {
            usuarioDto.nombres = usuario.nombres;
        }
        if (rol !== undefined) {
            usuarioDto.rol = usuario.rol;
        }

        await this.usuariosRepo.update(id, usuarioDto);
        return usuario;
    }
}