import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PrioridadActividadEnum } from "../enums/prioridadActividad.enum";
import { EstadosActividadEnum } from "../enums/estadoActividad.enum";


export class ActualizarActividadDto{

    @IsString()
    @IsOptional()
    descripcion: string

    @IsNumber()
    @IsOptional()
    idUsuarioActual: number

    @IsNumber()
    @IsOptional()
    idUsuarioModificacion: number

    @IsEnum(PrioridadActividadEnum)
    @IsOptional()
    prioridad: PrioridadActividadEnum
    
    @IsEnum(EstadosActividadEnum)
    @IsOptional()
    estado: EstadosActividadEnum


}