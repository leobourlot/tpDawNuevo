import { IsEnum, IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from "class-validator"
import { RolesEnum } from "../enums/roles-enum"


export class UsuarioDto{
    
    @IsNumberString()
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(8)
    dni: string
    
    @IsString()
    @IsNotEmpty()
    clave: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    nombreUsuario: string
    
    @IsString()
    @IsNotEmpty()
    apellido: string
    
    @IsString()
    @IsNotEmpty()
    nombres: string
    
    @IsEnum(RolesEnum)
    @IsNotEmpty()
    rol: RolesEnum


}