import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuditoriaActividadDto } from '../dtos/auditoria-actividades.dto';
import { UsuarioDto } from '../dtos/usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class AuditoriaActividadesService {
  constructor(private client: HttpClient) { }

  getAuditorias(): Observable<AuditoriaActividadDto[]> {
    return this.client.get<AuditoriaActividadDto[]>(
      environment?.apiUrl + '/auditoriaActividades'
    );
  }

  getUsuarios(): Observable<UsuarioDto[]> {
    return this.client.get<UsuarioDto[]>(environment?.apiUrl + '/usuarios');
  }

  


}