import { Injectable } from "@nestjs/common";
import { AuditoriaActividades } from "../entities/auditoriaActividades.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EstadosActividadEnum } from "src/actividades/enums/estadoActividad.enum";
import { Usuario } from "src/auth/entities/usuario.entity";


@Injectable()
export class AuditoriaActividadesService{

    constructor(@InjectRepository(AuditoriaActividades) private auditoriaActividadesRepo: Repository<AuditoriaActividades>) {

    }
    
    async obtenerAuditoriasActividades(): Promise<AuditoriaActividades[]> {
        const auditoriasActividades: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find()

        return auditoriasActividades
    }

    async obtenerModificaciones(): Promise<AuditoriaActividades[]>{
        const actividadesModificadas: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find({
            where: {
                operacion: "MODIFICACION"
            },
        });
        return actividadesModificadas    
        
    }

    async obtenerFinalizadas(): Promise<AuditoriaActividades[]>{
        const actividadesFinalizadas: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find({
            where: {
                estado: EstadosActividadEnum.FINALIZADO
            },
        });
        return actividadesFinalizadas    
        
    }

    // async obtenerActividadesUsuario(idUsuario: number): Promise<AuditoriaActividades[]>{
    //     const opciones: FindOneOptions<Actividad> = { where: { idActividad: id } };
        
    //     const actividadesUsuario: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find({
    //         where: {
    //             idUsuarioModificacion: idUsuario 
    //         },
    //     });
    //     return actividadesUsuario    
        
    // }

    async obtenerActividadesUsuario(usuario: Usuario): Promise<AuditoriaActividades[]> {   // vvvvvvvveeeeeeeeeerrrrrrrrrr, devuelve todas y no solo la de un usuario

        const consulta = this.auditoriaActividadesRepo
            .createQueryBuilder('actividadesAuditoria')
            .innerJoin('actividadesAuditoria.idUsuarioModificacion', 'usuario');
        return await consulta.getMany();
    }


}
