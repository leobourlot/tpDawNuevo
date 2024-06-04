import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto } from "../dtos/login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { EstadosUsuarioEnum } from "../enums/estado-Usuario.enum";
import { JwtService } from "@nestjs/jwt";
import { UsuariosService } from "./usuarios.services";


@Injectable()
export class AuthService {

    constructor(@InjectRepository(Usuario) private usuariosRepo: Repository<Usuario>,
        private usuariosService: UsuariosService,
        private jwtService: JwtService
    ) {

    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {


        const usuario: Usuario = 
        await this.usuariosService.obtenerUsuarioPorNombreDeUsuario(loginDto.nombreUsuario);
        if (!usuario) {
            throw new BadRequestException('Nombre de usuario no válido')
        }

        const claveCorrecta: boolean = bcrypt.compareSync(loginDto.clave, usuario.clave);

        if (!claveCorrecta) {
            throw new BadRequestException('Clave incorrecta');
        }

        const token: string = this.jwtService.sign({
            idUsuario: usuario.idUsuario,
            rol: usuario.rol,
            apellido: usuario.apellido,
            nombres: usuario.nombres,
            dni: usuario.dni,
            nombreUsuario: usuario.nombreUsuario,
            email: usuario.email,
        });

        return { token }
    }

}