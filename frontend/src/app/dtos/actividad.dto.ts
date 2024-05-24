import { EstadosActividadEnum } from "../enums/estados-actividad.enum";
import { PrioridadesEnum } from "../enums/prioridades.enum";
import { UsuarioDto } from "./usuario.dto";

export interface ActividadDto{
    
    idActividad: number;

    descripcion: string|null;
  
    idUsuarioActual: UsuarioDto|null;
  
    prioridad: PrioridadesEnum|null;
  
    estado: EstadosActividadEnum|null;
  
}