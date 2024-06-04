import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { AuthService } from "../../services/auth.services";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from "@angular/router";
import { RolesEnum } from "../../enums/roles.enum";
import { NgIf } from "@angular/common";
import { UsuarioDto } from "../../dtos/usuario.dto";
import { DatosUsuarioDialogComponent } from "../datosUsuario-dialog/datosUsuario-dialog.component";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [ButtonModule, MatToolbarModule,
        MatButtonModule, MatIconModule, NgIf, DatosUsuarioDialogComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    esEjecutor: boolean;
    esAdmin: boolean;
    usuario: UsuarioDto | null;
    dialogVisible: boolean = false;
    accion!: string;

    constructor(private authService: AuthService, private router: Router) {
        this.esEjecutor = this.authService.hasRole(RolesEnum.EJECUTOR);
        this.esAdmin = this.authService.hasRole(RolesEnum.ADMINISTRADOR);
        this.usuario = this.authService.datosUsuario();
        console.log('usuario es: ', this.usuario?.idUsuario)

    }

    cerrarSesion() {
        this.authService.logout();
    }

    usuarios() {
        this.router.navigateByUrl('/usuarios');
    }

    actividadesAdmin() {
        this.router.navigateByUrl('/admin');
    }

    actividadesEjec() {
        this.router.navigateByUrl('/ejecutor');
    }

    auditorias() {
        this.router.navigateByUrl('/auditorias');
    }

    verDatos() {
        this.accion = 'Datos';
        this.dialogVisible = true;
    }
}
