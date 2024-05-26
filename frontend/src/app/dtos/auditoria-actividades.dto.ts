import { EstadosActividadEnum } from "../enums/estados-actividad.enum";
import { PrioridadesEnum } from "../enums/prioridades.enum";
import { UsuarioDto } from "./usuario.dto";


export interface AuditoriaActividadDto{
    
    idActividad: number;

    descripcion: string|null;

    fecha: Date;

    prioridad: PrioridadesEnum|null;

    idUsuarioActual: UsuarioDto;

    idUsuarioModificacion: UsuarioDto;

    estado: EstadosActividadEnum;

    operacion: string;

}