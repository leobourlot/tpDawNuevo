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
import { AuditoriaDto } from '../../dtos/auditoria.dto';


/**
 * Pantalla para las auditorias
 */
@Component({
  selector: 'app-auditorias',
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
  templateUrl: './auditorias.component.html',
  styleUrl: './auditorias.component.scss'
})
export class AuditoriasComponent {
  auditorias!: AuditoriaDto[];
  dialogVisible: boolean = false;
  accion!: string;
  auditoriaSeleccionada!: UsuarioDto | null;
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
    /*
    this.usuariosService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrió un error al recuperar la lista de usuarios',
        });
      },
    });
    */

  }

  nuevo() {
    this.auditoriaSeleccionada = null;
    this.accion = 'Crear';
    this.dialogVisible = true;
  }

  editar() {
    this.accion = 'Editar';
    this.dialogVisible = true;
  }

}
