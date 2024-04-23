import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PrioridadActividadEnum } from "../enums/prioridadActividad.enum";
import { EstadosActividadEnum } from "../enums/estadoActividad.enum";


export class ActividadDto{

    @IsNotEmpty()
    @IsString()
    descripcion: string

    @IsNumber()
    @IsNotEmpty()
    idUsuario: number

    @IsNumber()
    idUsuarioModificacion: number

    @IsDate()
    fechaModificacion: Date

    @IsEnum(PrioridadActividadEnum)
    @IsNotEmpty()
    prioridad: PrioridadActividadEnum

    @IsEnum(EstadosActividadEnum)
    @IsNotEmpty()
    estado: EstadosActividadEnum


}