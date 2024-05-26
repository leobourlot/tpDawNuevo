import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { AuthService } from "../../services/auth.services";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from "@angular/router";
import { RolesEnum } from "../../enums/roles.enum";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [ButtonModule, MatToolbarModule,
        MatButtonModule, MatIconModule, NgIf],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    esEjecutor: boolean;
    esAdmin: boolean;

    constructor(private authService: AuthService, private router: Router) { 
        this.esEjecutor = this.authService.hasRole(RolesEnum.EJECUTOR);
        this.esAdmin = this.authService.hasRole(RolesEnum.ADMINISTRADOR);
        console.log(this.actividadesAdmin)
        console.log(this.actividadesEjec)
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
}
