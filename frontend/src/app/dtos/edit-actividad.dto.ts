import { PrioridadesEnum } from '../enums/prioridades.enum';
import { EstadosActividadEnum } from '../enums/estados-actividad.enum';
import { UsuarioDto } from './usuario.dto';

export interface EditActividadDto {

  idActividad: number;

  descripcion: string;

  idUsuarioActual: number;

  prioridad: PrioridadesEnum;

  estado: EstadosActividadEnum;
}
