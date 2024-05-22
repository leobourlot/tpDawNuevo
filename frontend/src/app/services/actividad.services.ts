import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../model/actividad.model';

@Injectable({
    providedIn: 'root'
})
export class ActividadService {
    private apiUrl = 'http://localhost:3005/api/actividades';
    private apiUrlEjecutor = 'http://localhost:3005/api/auditoriaActividades';

    constructor(private http: HttpClient) { }

    getActividades(): Observable<Actividad[]> {
        return this.http.get<Actividad[]>(this.apiUrl);
    }

    crearActividad(actividad: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/nueva`, actividad);
    }

    actualizarActividad(id: number, actividad: any): Observable<Actividad> {
        return this.http.put<Actividad>(`${this.apiUrl}/actualizar/${id}`, actividad);
    }

    eliminarActividad(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`);
    }

    // Métodos para el rol de ejecutor
    gettareasEjecutor(): Observable<Actividad[]> {
        return this.http.get<Actividad[]>(`${this.apiUrlEjecutor}`);
    }

    marcarFinalizada(id: number): Observable<any> {
        return this.http.put<any>(`${this.apiUrlEjecutor}/finalizar/${id}`, {});
    }

    eliminarTarea(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrlEjecutor}/eliminar/${id}`);
    }
}