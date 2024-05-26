import { PrioridadesEnum } from '../enums/prioridades.enum';

export interface CreateActividadDto {

  descripcion: string;

  idUsuarioActual: number;

  prioridad: PrioridadesEnum;

}
