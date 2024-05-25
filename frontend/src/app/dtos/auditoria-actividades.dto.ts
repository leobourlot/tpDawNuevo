import { EstadosActividadEnum } from "../enums/estados-actividad.enum";
import { PrioridadesEnum } from "../enums/prioridades.enum";


export interface AuditoriaActividadDto{
    
    idActividad: number;

    descripcion: string|null;
  
    prioridad: PrioridadesEnum|null;
  
   
  
}