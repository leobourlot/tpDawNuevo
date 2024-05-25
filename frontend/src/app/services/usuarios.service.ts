import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UsuarioDto } from '../dtos/usuario.dto';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { EditUsuarioDto } from '../dtos/edit-usuario.dto';

@Injectable({
    providedIn: 'root',
})
export class UsuariosService {
    constructor(private client: HttpClient) { }

    getUsuarios(): Observable<UsuarioDto[]> {
        console.log(this.client.get<UsuarioDto[]>(environment?.apiUrl + '/usuarios'));
        return this.client.get<UsuarioDto[]>(environment?.apiUrl + '/usuarios');
    }

    editar(usuarioDto: EditUsuarioDto) {

        const { idUsuario, ...datosSinId } = usuarioDto;

        return this.client.put(
            environment?.apiUrl + '/usuarios/modificar/' + usuarioDto.idUsuario,
            datosSinId
        );
    }

    crear(usuarioDto: CreateUsuarioDto): Observable<UsuarioDto> {
        return this.client.post<UsuarioDto>(
            environment?.apiUrl + '/usuarios/nuevo',
            usuarioDto
        );
    }
}
