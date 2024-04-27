import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ActividadDto } from "../dtos/actividad.dto";
import { ActividadesService } from "../services/actividades.service";
import { Actividad } from "../entities/actividad.entity";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesEnum } from "src/auth/enums/roles-enum";
import { crearActividadDto } from "../dtos/crearActividad.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guard";


@Controller("/actividades")
export class ActividadesController {

    constructor(private actividadesService: ActividadesService) {

    }

    // @Post("nueva")
    // async postActividadNueva(@Body() nuevaActividad: ActividadDto) {
    //     return await this.actividadesService.nuevaActividad(nuevaActividad);
    // }

    @Get()
    @Roles([RolesEnum.ADMINISTRADOR])
    async obtenerActividades(): Promise<Actividad[]> {
        return await this.actividadesService.obtenerActividades();
    }

    @Get("/:id")
    async obtenerActividadPorId(@Param("id") id: number): Promise<Actividad> {
        return await this.actividadesService.obtenerActividadPorId(id);
    }


    @ApiBearerAuth()        // Para informar a swagger que la ruta está protegida con bearer
    @UseGuards(AuthGuard)   //Para poder usar la información del guard en la request['usuario']
    @Post("nueva")
    @Roles([RolesEnum.ADMINISTRADOR])   // Para especificar que solo puede acceder un administrador
    async crearActividad(
        @Req() request: Request,
        @Body() crearActividadDto: crearActividadDto) {
        return await this.actividadesService.nuevaActividad(crearActividadDto, request['usuario']);
    }

    // @Put("/:id")
    // async actualizarActividad(@Param("id") id: number, @Body() actividadDto: ActividadDto): Promise<Actividad> {
    //     return await this.actividadesService.actualizarActividad(id, actividadDto);
    // }

    @Delete("/:id")
    @Roles([RolesEnum.ADMINISTRADOR])
    async eliminarActividad(@Param("id") id: number): Promise<{ mensaje: string }> {
        const actividadId = id;
        const mensaje = await this.actividadesService.eliminarActividad(actividadId);
        return { mensaje };
    }

}