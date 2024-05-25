import { EstadosActividadEnum } from "../enums/estados-actividad.enum";
import { PrioridadesEnum } from "../enums/prioridades.enum";
import { ActividadDto } from "./actividad.dto";
import { UsuarioDto } from "./usuario.dto";

export interface AuditoriaDto{

    idActividadesAuditoria: number;

    idActividad: ActividadDto;

    descripcion: string;

    idUsuarioActual: UsuarioDto;

    idUsuarioModificacion: UsuarioDto;

    fechaModificacion: Date;

    prioridad: PrioridadesEnum;

    estado: EstadosActividadEnum;

    operacion: string;

}
