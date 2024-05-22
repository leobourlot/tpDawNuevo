import { OperacionActividadEnum } from '../enums/operacion-actividad.enum';

export interface Actividad {
    idActividad: number;
    idUsuarioActual: number;
    idUsuarioModificacion: number;
    prioridad: string;
    estado: string;
    descripcion: string;
    fechaModificacion: Date;
    operacion: OperacionActividadEnum;
}