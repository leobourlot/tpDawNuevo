import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EstadosUsuarioEnum } from '../enums/estado-Usuario.enum';
import { RolesEnum } from '../enums/roles-enum';
import { Exclude } from 'class-transformer';

@Entity({name: 'usuarios'})
export class Usuario{

    @PrimaryGeneratedColumn()
    idUsuario: number

    @Column()
    dni: string

    @Column({name: 'email'})
    email: string
    
    @Exclude()
    @Column({name: 'clave'})
    clave: string

    @Column({name: 'apellido'})
    apellido: string

    @Column({name: 'nombres'})
    nombres: string

    @Column({type: 'enum', enum: EstadosUsuarioEnum})
    estado: EstadosUsuarioEnum
    
    @Column({name: 'nombreUsuario'})
    nombreUsuario: string

    @Column({type: 'enum', enum: RolesEnum})
    rol: RolesEnum

}