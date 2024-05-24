import { PrioridadesEnum } from '../enums/prioridades.enum';
import { EstadosActividadEnum } from '../enums/estados-actividad.enum';
import { UsuarioDto } from './usuario.dto';
import { RolesEnum } from '../enums/roles.enum';

export interface EditUsuarioDto {

  // id: number;

  dni: string;

  apellido: string;

  nombres: string;

  clave: string;

  email: string;

  nombreUsuario: string;

  rol: RolesEnum;
}
