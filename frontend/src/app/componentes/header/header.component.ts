import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { AuthService } from "../../services/auth.services";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [ButtonModule, MatToolbarModule,
        MatButtonModule, MatIconModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})

export class HeaderComponent {
    constructor(private authService: AuthService) { }

    cerrarSesion() {
        this.authService.logout();
    }
}
