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
import { EstadosActividadEnum } from '../../enums/estados-actividad.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { AuditoriaActividadesService } from '../../services/auditoriaactividades.services';
import { AuditoriaActividadDto } from '../../dtos/auditoria-actividades.dto';


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
  auditorias!: AuditoriaActividadDto[];
  dialogVisible: boolean = false;
  accion!: string;
  auditoriaSeleccionada!: AuditoriaActividadDto | null;
  columnas!: { field: string; header: string; filter?: boolean }[];
  opcionesDeFiltro!: SelectItem[];
  usuarios!: UsuarioDto[];

  estados = Object.values(EstadosActividadEnum);


  form = new FormGroup({
    estado: new FormControl<EstadosActividadEnum | null>(null),
  });

  constructor(
    private usuariosService: UsuariosService,
    private auditoriaActividadesService: AuditoriaActividadesService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.columnas = [
      { field: 'idActividadesAuditoria', header: 'Id' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'fechaModificacion', header: 'Fecha' },
      { field: 'prioridad', header: 'Prioridad' },
      { field: 'estado', header: 'Estado' },
      { field: 'operacion', header: 'Operacion' },
      { field: 'idUsuarioActual', header: 'Responsable' },
      { field: 'idUsuarioModificacion', header: 'Resp. Ultima Mod.' },
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
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.auditoriaActividadesService.getAuditorias().subscribe({
          next: (auditorias) => {
            this.auditorias = this.transformarDatos(auditorias, usuarios);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ocurrió un error al recuperar la lista de auditorias',
            });
          }
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrió un error al recuperar la lista de usuarios',
        });
      }
    });
  }

  transformarDatos(data: AuditoriaActividadDto[], usuarios: UsuarioDto[]) : AuditoriaActividadDto[] {
    console.log('auditorias es: ', data)
    return data.map(auditoria => ({
      ...auditoria,
      responsable: this.getNombreUsuario(auditoria.idUsuarioActual.idUsuario, usuarios),
      ultimo: this.getNombreUsuario(auditoria.idUsuarioModificacion.idUsuario, usuarios)
    }));
  }

  getNombreUsuario(id: any, usuarios: UsuarioDto[]): string {
    console.log('id es: ', id)
    // console.log('usuarios es: ', usuarios)
    const usuario = usuarios.find(u => u.idUsuario === id);
    console.log('nombreUsuario es: ', usuario?.nombreUsuario)
    return usuario ? usuario.nombreUsuario : 'Desconocido';
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
