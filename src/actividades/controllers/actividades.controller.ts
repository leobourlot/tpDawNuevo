import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ActualizarActividadDto } from "../dtos/actualizarActividad.dto";
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

    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
    @UseGuards(AuthGuard)
    @Get()
    async obtenerActividades(@Req()request : Request) {
        return await this.actividadesService.obtenerActividades(request['usuario']);
    }

    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
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

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
    @Put("actualizar/:id")
    async actualizarActividad(
        @Req() request: Request,
        @Param("id") id: number, 
        @Body() actualizarActividadDto: ActualizarActividadDto): Promise<Actividad> {
        return await this.actividadesService.actualizarActividad(id, actualizarActividadDto, request['usuario']);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete("eliminar/:id")
    @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
    async eliminarActividad(@Param("id") id: number): Promise<{ mensaje: string }> {
        const actividadId = id;
        const mensaje = await this.actividadesService.eliminarActividad(actividadId);
        return { mensaje };
    }

}