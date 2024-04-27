import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EstadosActividadEnum } from '../enums/estadoActividad.enum';
import { PrioridadActividadEnum } from '../enums/prioridadActividad.enum';
import { OperacionActividadEnum } from '../enums/operacionActividad.enum';
import { Usuario } from 'src/auth/entities/usuario.entity';

@Entity({name: 'actividades'})
export class Actividad{

    @PrimaryGeneratedColumn()
    idActividad: number;

    @Column()
    descripcion: string;

    @ManyToOne(()=> Usuario)
    @JoinColumn({name: 'idUsuarioActual'})
    idUsuarioActual: Usuario;
    
    @ManyToOne(()=> Usuario)
    @JoinColumn({name: 'idUsuarioModificacion'})
    idUsuarioModificacion: Usuario;

    @Column()
    fechaModificacion: Date;

    @Column({type: 'enum', enum: PrioridadActividadEnum})
    prioridad: PrioridadActividadEnum;

    @Column({type: 'enum', enum: EstadosActividadEnum, default: EstadosActividadEnum.PENDIENTE})
    estado: EstadosActividadEnum;
    
    @Column({type: 'enum', enum: OperacionActividadEnum})
    operacion: OperacionActividadEnum;

}