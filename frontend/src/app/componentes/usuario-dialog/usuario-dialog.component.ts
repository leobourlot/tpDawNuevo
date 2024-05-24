import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { UsuarioDto } from '../../dtos/usuario.dto';
// import { PrioridadesEnum } from '../../enums/prioridades.enum';
// import { EstadosActividadEnum } from '../../enums/estados-actividad.enum';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ActividadesService } from '../../services/actividades.service';
import { ActividadDto } from '../../dtos/actividad.dto';
import { DropdownModule } from 'primeng/dropdown';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UsuariosService } from '../../services/usuarios.service';
import { RolesEnum } from '../../enums/roles.enum';
@Component({
    selector: 'app-usuario-dialog',
    standalone: true,
    imports: [
        DialogModule,
        InputTextareaModule,
        ButtonModule,
        DropdownModule,
        ReactiveFormsModule,
        ToastModule,
        NgIf,
    ],
    templateUrl: './usuario-dialog.component.html',
    styleUrl: './usuario-dialog.component.scss',
})
export class UsuarioDialogComponent {
    @Input({ required: true }) visible!: boolean;

    @Output() visibleChange = new EventEmitter<boolean>();

    @Output() refrescar = new EventEmitter<boolean>();

    @Input({ required: true }) accion!: string;

    @Input({ required: false }) usuario!: UsuarioDto | null;

    actividades!: ActividadDto[];

    rol = Object.values(RolesEnum);

    // estados = Object.values(EstadosActividadEnum);

    form = new FormGroup({
        idUsuario: new FormControl<number | null>(null),
        apellido: new FormControl<string | null>(null, [Validators.required]),
        nombres: new FormControl<string | null>(null, [
            Validators.required,
        ]),
        nombreUsuario: new FormControl<string | null>(null, [
            Validators.required,
        ]),
        dni: new FormControl<string | null>(null, [
            Validators.required,
        ]),
        email: new FormControl<string | null>(null, [
            Validators.required,
        ]),
        clave: new FormControl<string | null>(null, [
            Validators.required,
        ]),
        rol: new FormControl<RolesEnum | null>(null, [
            Validators.required,
        ]),
        // actividades: new FormControl<ActividadDto[] | null>(null),
    });

    constructor(
        private actividadesService: ActividadesService,
        private usuariosService: UsuariosService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.actividadesService.getActividades().subscribe({
            next: (res) => {
                this.actividades = res;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Hubo un error al recuperar las opciones de usuario',
                });
            },
        });
    }

    llenarForm() {
        this.form.patchValue({
            idUsuario: this.usuario!.idUsuario as number,
            apellido: this.usuario!.apellido,
            nombres: this.usuario!.nombres,
            nombreUsuario: this.usuario!.nombreUsuario,
            dni: this.usuario!.dni,
            email: this.usuario!.email,
            rol: this.usuario!.rol,
            clave: this.usuario!.clave,
            // actividades: this.actividades!.descripcion,
            // usuarioActual: this.actividad!.usuarioActual,
        });
    }

    ngOnChanges() {
        if (this.usuario) {
            this.llenarForm();
        } else {
            this.form.reset();
        }
    }

    cerrar() {
        this.visibleChange.emit(false);
    }

    enviar() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            this.messageService.add({
                severity: 'error',
                summary: 'Debe ingresar todos los campos',
            });
            return;
        }

        const usuarioDto = this.form.getRawValue();
        
        console.log(usuarioDto);

        if (this.usuario) {
            this.usuariosService
                .editar({
                    idUsuario: usuarioDto.idUsuario!,
                    apellido: usuarioDto.apellido!,
                    nombres: usuarioDto.nombres!,
                    nombreUsuario: usuarioDto.nombreUsuario!,
                    dni: usuarioDto.dni!,
                    email: usuarioDto.email!,
                    rol: usuarioDto.rol!,
                    clave: usuarioDto.clave!,
                    // actividades: usuarioDto.actividades!,
                })
                .subscribe({
                    next: (res) => {
                        this.cerrar();
                        this.refrescar.emit();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Usuario editado con éxito!',
                        });
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Ocurrió un error al editar el usuario',
                        });
                    },
                });
        } else {
            this.usuariosService
                .crear({
                    apellido: usuarioDto.apellido!,
                    nombres: usuarioDto.nombres!,

                })
                .subscribe({
                    next: (res) => {
                        this.cerrar();
                        this.refrescar.emit();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Usuario creado con éxito!',
                        });
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Ocurrió un error al crear el usuario',
                        });
                    },
                });
        }
    }
}
