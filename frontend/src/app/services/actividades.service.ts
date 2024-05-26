import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActividadDto } from '../dtos/actividad.dto';
import { CreateActividadDto } from '../dtos/create-actividad.dto';
import { EditActividadDto } from '../dtos/edit-actividad.dto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActividadesService {
  constructor(private client: HttpClient) {}

  getActividades(): Observable<ActividadDto[]> {
    return this.client.get<ActividadDto[]>(
      environment?.apiUrl + '/actividades'
    );
  }

  crear(actividadDto: CreateActividadDto): Observable<ActividadDto> {
    return this.client.post<ActividadDto>(
      environment?.apiUrl + '/actividades/nueva',
      actividadDto
    );
  }

  editar(actividadDto: EditActividadDto) {
    const { idActividad, ...dataWithoutId } = actividadDto;

    return this.client.put(
      environment?.apiUrl + '/actividades/actualizar/' + actividadDto.idActividad,
      dataWithoutId
    );
  }

  eliminar(idActividad: number): Observable<any> {
    return this.client.delete(`${environment.apiUrl}/auditoriaActividades/eliminar/${idActividad}`);
  }

}
