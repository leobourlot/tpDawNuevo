import { PrioridadesEnum } from '../enums/prioridades.enum';
import { UsuarioDto } from './usuario.dto';

export interface CreateActividadDto {
  descripcion: string;

  idUsuarioActual: number;

  prioridad: PrioridadesEnum;
}
