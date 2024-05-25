import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { RolesEnum } from "../enums/roles-enum"


export class ActualizarUsuarioDto{
    
    @IsNumber()
    @IsOptional()
    id: number
    
    @IsNumberString()
    @IsOptional()
    @MinLength(7)
    @MaxLength(8)
    dni: string
    
    @IsString()
    @IsOptional()
    clave: string

    @IsString()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    nombreUsuario: string
    
    @IsString()
    @IsOptional()
    apellido: string
    
    @IsString()
    @IsOptional()
    nombres: string
    
    @IsEnum(RolesEnum)
    @IsOptional()
    rol: RolesEnum


}