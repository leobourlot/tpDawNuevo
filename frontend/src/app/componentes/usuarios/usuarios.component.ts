import { Component, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { NgFor, NgIf } from '@angular/common';
import { MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router, RouterModule } from '@angular/router';
import { TablaBaseComponent } from '../tabla-base/tabla-base.component';
import { BaseComponent } from '../base/base.component';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioDialogComponent } from '../usuario-dialog/usuario-dialog.component';
import { AuthService } from '../../services/auth.services';

/**
 * Pantalla para los usuarios con el rol de ADMINISTRADOR
 */
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    UsuarioDialogComponent,
    ButtonModule,
    TooltipModule,
    ToastModule,
    NgIf,
    NgFor,
    RouterModule,
    TablaBaseComponent,
    TableModule,
    BaseComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  usuarios!: UsuarioDto[];
  filteredUsuarios!: UsuarioDto[];
  dialogVisible: boolean = false;
  accion!: string;
  usuarioSeleccionado!: UsuarioDto | null;
  columnas!: { field: string; header: string; filter?: boolean }[];
  opcionesDeFiltro!: SelectItem[];

  constructor(
    private usuariosService: UsuariosService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.columnas = [
      { field: 'idUsuario', header: 'Id' },
      { field: 'dni', header: 'DNI' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'nombres', header: 'Nombres' },
      { field: 'email', header: 'Email' },
      { field: 'rol', header: 'Rol' },
      { field: 'estado', header: 'Estado' },
    ];

    this.opcionesDeFiltro = [
      {
        value: 'startsWith',
        label: 'Empieza con',
      },
      {
        value: 'contains',
        label: 'Contiene',
      },
    ];
    this.llenarTabla();
  }

  llenarTabla() {
    this.usuariosService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
        this.filteredUsuarios = res;

      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrió un error al recuperar la lista de usuarios',
        });
      },
    });

  }

  buscar(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.dni.toLowerCase().includes(query) ||
      usuario.apellido.toLowerCase().includes(query) ||
      usuario.nombres.toLowerCase().includes(query) ||
      usuario.email.toLowerCase().includes(query) ||
      usuario.rol.toLowerCase().includes(query)
    );
  }

  nuevo() {
    this.usuarioSeleccionado = null;
    this.accion = 'Crear';
    this.dialogVisible = true;
  }

  editar() {
    this.accion = 'Editar';
    this.dialogVisible = true;
  }

  eliminar() {

    if (this.usuarioSeleccionado) {
      this.usuariosService.eliminar(this.usuarioSeleccionado)
        .subscribe({
          next: (res) => {
            this.llenarTabla();
            this.messageService.add({
              severity: 'success',
              summary: 'Usuario eliminado con éxito!',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ocurrió un error al eliminar el usuario',
            });
          },
        });
    }
  }
}
