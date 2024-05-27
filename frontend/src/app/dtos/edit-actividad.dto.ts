import { PrioridadesEnum } from '../enums/prioridades.enum';
import { EstadosActividadEnum } from '../enums/estados-actividad.enum';

export interface EditActividadDto {

  idActividad: number | null;

  descripcion: string | null;

  idUsuarioActual: number | null;

  prioridad: PrioridadesEnum | null;

  estado: EstadosActividadEnum | null;
}
