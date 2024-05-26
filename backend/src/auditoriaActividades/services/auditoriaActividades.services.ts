import { Injectable, Param } from "@nestjs/common";
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
        const auditoriasActividades: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find({
            relations: ['idUsuarioActual', 'idUsuarioModificacion']
        })

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

    async obtenerPendientes(): Promise<AuditoriaActividades[]>{
        const actividadesPendientes: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find({
            where: {
                estado: EstadosActividadEnum.PENDIENTE
            },
        });
        return actividadesPendientes    
        
    }
    
    async obtenerEliminadas(): Promise<AuditoriaActividades[]>{
        const actividadesEliminadas: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find({
            where: {
                estado: EstadosActividadEnum.ELIMINADO
            },
        });
        return actividadesEliminadas    
        
    }

    async obtenerActividadesUsuario(usuario: Usuario): Promise<AuditoriaActividades[]> {  

        const actividadesUsuario: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find({
            where: {
                idUsuarioModificacion: usuario
            }
        });
        return actividadesUsuario; 
        
    }

    async obtenerActividadesPendientesUsuario(usuario: Usuario): Promise<AuditoriaActividades[]> {   

        const actividadesPendientesUsuario: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find({
            where: {
                idUsuarioModificacion: usuario,
                estado: EstadosActividadEnum.PENDIENTE
            }
        });
        return actividadesPendientesUsuario; 
        
    }

    async obtenerActividadesFinalizadasUsuario(usuario: Usuario): Promise<AuditoriaActividades[]> {   

        const actividadesFinalizadasUsuario: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find({
            where: {
                idUsuarioModificacion: usuario,
                estado: EstadosActividadEnum.FINALIZADO
            }
        });
        return actividadesFinalizadasUsuario; 
        
    }
    
    async obtenerActividadesEliminadasUsuario(usuario: Usuario): Promise<AuditoriaActividades[]> {   

        const actividadesEliminadasUsuario: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find({
            where: {
                idUsuarioModificacion: usuario,
                estado: EstadosActividadEnum.ELIMINADO
            }
        });
        return actividadesEliminadasUsuario; 
        
    }


}
