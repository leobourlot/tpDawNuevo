import { Body, Controller, Post } from "@nestjs/common";
import { ActividadDto } from "../dtos/actividad.dto";
import { ActividadesService } from "../services/actividades.service";


@Controller("actividades")
export class ActividadesController {

    constructor(private actividadesService: ActividadesService) {

    }

    @Post("/nueva")
    async postActividadNueva(@Body() nuevaActividad: ActividadDto) {
        return await this.actividadesService.nuevaActividad(nuevaActividad);
    }

}