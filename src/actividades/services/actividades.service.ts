import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Actividad } from "../entities/actividad.entity";
import { Repository } from "typeorm";
import { ActividadDto } from "../dtos/actividad.dto";
import { PrioridadActividadEnum } from "../enums/prioridadActividad.enum";
import { EstadosActividadEnum } from "../enums/estadoActividad.enum";


@Injectable()
export class ActividadesService {

    constructor(@InjectRepository(Actividad) private actividadesRepo: Repository<Actividad>) {

    }

    async nuevaActividad(datosNuevaActividad: ActividadDto): Promise<Actividad> {
        const { descripcion, idUsuario, idUsuarioModificacion, fechaModificacion } = datosNuevaActividad

        // Crear nueva actividad
        const nuevaActividad = this.actividadesRepo.create({
            descripcion,
            idUsuario,
            idUsuarioModificacion,
            fechaModificacion,
            prioridad: PrioridadActividadEnum.MEDIA,
            estado: EstadosActividadEnum.PENDIENTE,            
        });

        // Guardar el nuevo usuario en la base de datos
        try {
            await this.actividadesRepo.save(nuevaActividad);
        } catch (error) {
            throw new BadRequestException('Error al registrar el usuario.');
        }

        return nuevaActividad
    }

}