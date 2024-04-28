import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Actividad } from "../entities/actividad.entity";
import { FindOneOptions, Repository } from "typeorm";
import { ActualizarActividadDto } from "../dtos/actualizarActividad.dto";
import { EstadosActividadEnum } from "../enums/estadoActividad.enum";
import { crearActividadDto } from "../dtos/crearActividad.dto";
import { UsuariosService } from "src/auth/services/usuarios.services";
import { Usuario } from "src/auth/entities/usuario.entity";
import { RolesEnum } from "src/auth/enums/roles-enum";


@Injectable()
export class ActividadesService {

    constructor(@InjectRepository(Actividad) private actividadesRepo: Repository<Actividad>, private usuariosService: UsuariosService) {

    }

    async obtenerActividades(usuario: Usuario): Promise<Actividad[]> {

        const rol: RolesEnum = usuario.rol;

        const consulta = this.actividadesRepo
            .createQueryBuilder('actividades')
            .innerJoin('actividades.idUsuarioActual', 'usuario');

        if (rol === RolesEnum.EJECUTOR) {
            consulta.where('actividades.estado = :estado', {
                estado: EstadosActividadEnum.PENDIENTE                
            }).andWhere('usuario.idUsuario = :idUsuario', {
                idUsuario: usuario.idUsuario
            })
        }

        return await consulta.getMany();
    }

    async obtenerActividadPorId(id: number): Promise<Actividad> {
        const opciones: FindOneOptions<Actividad> = { where: { idActividad: id } };
        return await this.actividadesRepo.findOneOrFail(opciones);
    }

    async nuevaActividad(crearActividadDto: crearActividadDto, usuario: Usuario) {

        const actividad: Actividad = this.actividadesRepo.create();

        actividad.descripcion = crearActividadDto.descripcion;
        actividad.idUsuarioActual = await this.usuariosService.findOneById(crearActividadDto.idUsuarioActual);
        actividad.prioridad = crearActividadDto.prioridad;
        actividad.fechaModificacion = new Date;
        actividad.idUsuarioModificacion = usuario;

        await this.actividadesRepo.save(actividad);

    }

    async actualizarActividad(id: number, actualizarActividadDto: ActualizarActividadDto, usuario: Usuario): Promise<Actividad> {
        
        const actividadExistente: Actividad = await this.obtenerActividadPorId(id);

        if(!actividadExistente){
            throw new BadRequestException('La actividad no existe.')
        }

        if(usuario.rol === RolesEnum.ADMINISTRADOR){
            actividadExistente.descripcion = actualizarActividadDto.descripcion;
            actividadExistente.prioridad = actualizarActividadDto.prioridad
        } else if(usuario.rol === RolesEnum.EJECUTOR){
            actividadExistente.estado = actualizarActividadDto.estado
        }
        
        actividadExistente.idUsuarioModificacion = usuario;
        actividadExistente.fechaModificacion = new Date;
        
        try {
            await this.actividadesRepo.save(actividadExistente);
        } catch (error) {
            throw new BadRequestException('Error al actualizar la actividad.');
        }

        return actividadExistente;
    }

    async eliminarActividad(idActividad: number): Promise<string> {
        const actividadExistente = await this.actividadesRepo.findOne({ where: { idActividad } });

        if (!actividadExistente) {
            throw new NotFoundException('La actividad a eliminar no existe.');
        }

        actividadExistente.estado = EstadosActividadEnum.ELIMINADO;

        await this.actividadesRepo.save(actividadExistente);

        return `La actividad con ID ${idActividad} fue eliminada correctamente.`;
    }

}