import { Component} from '@angular/core';
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
import { EstadosActividadEnum } from '../../enums/estados-actividad.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { AuditoriaActividadesService } from '../../services/auditoriaactividades.services';
import { AuditoriaActividadDto } from '../../dtos/auditoria-actividades.dto';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RolesEnum } from '../../enums/roles.enum'; // Asegúrate de importar el enum RolesEnum correctamente


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
    BaseComponent,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './auditorias.component.html',
  styleUrl: './auditorias.component.scss'
})
export class AuditoriasComponent {
  auditorias!: AuditoriaActividadDto[];
  auditoriasFiltradas!: AuditoriaActividadDto[];
  dialogVisible: boolean = false;
  accion!: string;
  auditoriaSeleccionada!: AuditoriaActividadDto | null;
  columnas!: { field: string; header: string; filter?: boolean }[];
  opcionesDeFiltro!: SelectItem[];
  usuarios!: UsuarioDto[];
  estados = Object.values(EstadosActividadEnum);

  form = new FormGroup({
    idUsuarioActual: new FormControl<UsuarioDto | null>(null),
    estado: new FormControl<EstadosActividadEnum | null>(null),
    searchTerm: new FormControl<string>('')
  });

  constructor(
    private usuariosService: UsuariosService,
    private auditoriaActividadesService: AuditoriaActividadesService,
    private messageService: MessageService,
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

    this.form.get('idUsuarioActual')!.valueChanges.subscribe(selectedValue => {
      this.llenarTabla(selectedValue);
    });

    this.form.get('searchTerm')!.valueChanges.subscribe(searchTerm => {
      this.llenarTabla(this.form.get('idUsuarioActual')!.value, searchTerm);
    });
    
    this.llenarTabla();
  }

  llenarTabla(idUsuarioActual?: UsuarioDto | null, searchTerm?: string | null) {
    this.usuariosService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.agregoOpcionASelector(usuarios);
        this.auditoriaActividadesService.getAuditorias().subscribe({
          next: (auditorias) => {
            const auditoriasTransformadas = this.transformarDatos(auditorias, usuarios);
            let filtradas = auditoriasTransformadas;

            if (idUsuarioActual && idUsuarioActual.idUsuario !== null) {
              filtradas = this.filtrarAuditoriasPorUsuario(filtradas, idUsuarioActual.idUsuario);
            }

            if (searchTerm) {
              filtradas = this.filtrarAuditoriasPorBusqueda(filtradas, searchTerm);
            }

            this.auditoriasFiltradas = filtradas;
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

  filtrarAuditoriasPorUsuario(auditorias: AuditoriaActividadDto[], idUsuario: any): AuditoriaActividadDto[] {
    if(idUsuario == 0){
      return auditorias
    }else{
      return auditorias.filter(auditoria => auditoria.idUsuarioActual.idUsuario === idUsuario);
    }
  }

  filtrarAuditoriasPorBusqueda(auditorias: AuditoriaActividadDto[], searchTerm: string): AuditoriaActividadDto[] {
    return auditorias.filter(auditoria =>
      Object.values(auditoria).some(value =>
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  agregoOpcionASelector(usuarios: UsuarioDto[]){
    // Agregar opción vacía al principio de la lista de usuarios
    const usuarioTodos: UsuarioDto = {
      idUsuario: 0,
      apellido: '',
      nombres: '',
      nombreUsuario: 'Todos',
      dni: '',
      email: '',
      rol: RolesEnum.ADMINISTRADOR, // Asigna un rol válido según tu enum
      clave: ''
    };
    this.usuarios.push(usuarioTodos); // Agrega la opción "Todos" al principio de la lista

  }

  getNombreUsuario(id: any, usuarios: UsuarioDto[]): string {
    console.log('id es: ', id)
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

  buscar(event: Event) {
    const resultado = (event.target as HTMLInputElement).value.toLowerCase();
    this.auditorias = this.auditorias.filter(auditoria =>
      auditoria.descripcion && auditoria.descripcion.toLowerCase().includes(resultado) ||
      auditoria.prioridad && auditoria.prioridad.toLowerCase().includes(resultado) ||
      auditoria.estado && auditoria.estado.toLowerCase().includes(resultado) ||
      auditoria.idUsuarioActual?.nombreUsuario && auditoria.idUsuarioActual.nombreUsuario.toString().includes(resultado)      
    );
  }
}
