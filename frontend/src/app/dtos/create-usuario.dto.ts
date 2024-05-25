import { RolesEnum } from "../enums/roles.enum";

export interface CreateUsuarioDto {
  apellido: string;

  nombres: string;

  dni: string;

  email: string;

  rol: RolesEnum;

  nombreUsuario: string;

  clave: string;

  
}
