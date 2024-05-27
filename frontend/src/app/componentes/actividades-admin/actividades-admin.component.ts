import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ActividadDto } from '../../dtos/actividad.dto';
import { ActividadesService } from '../../services/actividades.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ActividadDialogComponent } from '../actividad-dialog/actividad-dialog.component';
import { NgFor, NgIf } from '@angular/common';
import { MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router, RouterModule } from '@angular/router';
import { TablaBaseComponent } from '../tabla-base/tabla-base.component';
import { BaseComponent } from '../base/base.component';
import { InputTextModule } from 'primeng/inputtext';

/**
 * Pantalla para los usuarios con el rol de ADMINISTRADOR
 */
@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [
    ActividadDialogComponent,
    ButtonModule,
    TooltipModule,
    ToastModule,
    NgIf,
    NgFor,
    RouterModule,
    TablaBaseComponent,
    TableModule,
    BaseComponent,
    InputTextModule
  ],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.scss',
})
export class ActividadesAdminComponent {
  actividades!: ActividadDto[];
  actividadesFiltradas!: ActividadDto[];
  dialogVisible: boolean = false;
  accion!: string;
  actividadSeleccionada!: ActividadDto | null;
  columnas!: { field: string; header: string; filter?: boolean }[];
  opcionesDeFiltro!: SelectItem[];

  constructor(
    private actividadesService: ActividadesService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.columnas = [
      { field: 'idActividad', header: 'Id' },
      { field: 'descripcion', header: 'Descripción', filter: true },
      { field: 'prioridad', header: 'Prioridad' },
      { field: 'responsable', header: 'Responsable' },
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
    this.actividadesService.getActividades().subscribe({
      next: (res) => {
        this.actividades = this.transformarDatos(res);
        this.actividadesFiltradas = this.actividades;

      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrió un error al recuperar la lista de actividades',
        });
      },
    });
  }

  transformarDatos(data: ActividadDto[]): ActividadDto[] {
    return data.map(actividad => ({
      ...actividad,
      responsable: actividad.idUsuarioActual ? actividad.idUsuarioActual.nombreUsuario : ''
    }));
  }

  nuevo() {
    this.actividadSeleccionada = null;
    this.accion = 'Crear';
    this.dialogVisible = true;
  }

  editar() {
    this.accion = 'Editar';
    this.dialogVisible = true;
  }

  auditoria() {
    this.router.navigateByUrl('/auditoriaActividades/actividadesModificadas' + this.actividadSeleccionada!.idActividad);
  }

  eliminar() {
    if (this.actividadSeleccionada) {
      this.actividadesService.eliminar(this.actividadSeleccionada.idActividad)
        .subscribe({
          next: (res) => {
            this.llenarTabla();
            this.messageService.add({
              severity: 'success',
              summary: 'Actividad eliminada con éxito!',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ocurrió un error al eliminar la actividad',
            });
          },
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Seleccione una actividad para eliminar',
      });
    }
  }

  buscar(event: Event) {
    const resultado = (event.target as HTMLInputElement).value.toLowerCase();
    this.actividadesFiltradas = this.actividades.filter(actividad =>
      actividad.descripcion && actividad.descripcion.toLowerCase().includes(resultado) ||
      actividad.prioridad && actividad.prioridad.toLowerCase().includes(resultado) ||
      actividad.estado && actividad.estado.toLowerCase().includes(resultado) ||
      actividad.idUsuarioActual?.nombreUsuario && actividad.idUsuarioActual.nombreUsuario.toString().includes(resultado)
    );
  }
}
