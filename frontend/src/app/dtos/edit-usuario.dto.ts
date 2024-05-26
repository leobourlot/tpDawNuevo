import { RolesEnum } from '../enums/roles.enum';

export interface EditUsuarioDto {

  idUsuario: number;

  dni: string;

  apellido: string;

  nombres: string;

  email: string;

  nombreUsuario: string;

  rol: RolesEnum;
  
}
