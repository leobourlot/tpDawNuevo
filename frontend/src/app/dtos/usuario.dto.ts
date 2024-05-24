import { RolesEnum } from "../enums/roles.enum";

export interface UsuarioDto{

    idUsuario: number;

    apellido: string;

    nombres: string;

    nombreUsuario: string;

    dni: string;
    
    email: string;

    rol: RolesEnum;

    clave: string;
}