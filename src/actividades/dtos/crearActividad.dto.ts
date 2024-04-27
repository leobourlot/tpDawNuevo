import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PrioridadActividadEnum } from "../enums/prioridadActividad.enum";


export class crearActividadDto{

    @IsString()
    @IsNotEmpty()
    descripcion: string

    @IsNotEmpty()
    @IsNumber()
    idUsuarioActual: number

    @IsEnum(PrioridadActividadEnum)
    @IsNotEmpty()
    prioridad: PrioridadActividadEnum

}