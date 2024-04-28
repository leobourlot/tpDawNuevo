import { Actividad } from "src/actividades/entities/actividad.entity";
import { EstadosActividadEnum } from "src/actividades/enums/estadoActividad.enum";
import { PrioridadActividadEnum } from "src/actividades/enums/prioridadActividad.enum";
import { Usuario } from "src/auth/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'actividadesAuditoria'})
export class AuditoriaActividades{

    @PrimaryGeneratedColumn()
    idActividadesAuditoria: number;

    @ManyToOne(()=> Actividad)
    @JoinColumn({name: 'idActividad'})
    idActividad: Actividad;

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

    @Column()
    operacion: string;

}

