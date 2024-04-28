import { Injectable } from "@nestjs/common";
import { AuditoriaActividades } from "../entities/auditoriaActividades.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class AuditoriaActividadesService{

    constructor(@InjectRepository(AuditoriaActividades) private auditoriaActividadesRepo: Repository<AuditoriaActividades>) {

    }
    
    async obtenerAuditoriasActividades(): Promise<AuditoriaActividades[]> {
        const auditoriasActividades: AuditoriaActividades[] = await this.auditoriaActividadesRepo.find()

        return auditoriasActividades
    }

}
