import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { UsuarioDto } from '../../dtos/usuario.dto';
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
    selector: 'app-datosUsuario-dialog',
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
    templateUrl: './datosUsuario-dialog.component.html',
    styleUrl: './datosUsuario-dialog.component.scss',
})
export class DatosUsuarioDialogComponent {

    @Input({ required: true }) visible!: boolean;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() refrescar = new EventEmitter<boolean>();
    @Input({ required: true }) accion!: string;
    @Input({ required: false }) usuario!: UsuarioDto | null;
    rol = Object.values(RolesEnum);

    form = new FormGroup({
        idUsuario: new FormControl<number | null>(null),
        apellido: new FormControl<string | null>(null, [Validators.required]),
        nombres: new FormControl<string | null>(null, [
            Validators.required,
        ]),
        nombreUsuario: new FormControl<string | null>(null),
        dni: new FormControl<string | null>(null),
        email: new FormControl<string | null>(null),
        // clave: new FormControl<string | null>(null),
        rol: new FormControl<RolesEnum | null>(null),
    });

    constructor(
        // private actividadesService: ActividadesService,
        // private usuariosService: UsuariosService,
        // private messageService: MessageService
    ) { }

    ngOnInit() {
        this.llenarForm();
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
        });
    }

    cerrar() {
        this.visibleChange.emit(false);
    }


}
