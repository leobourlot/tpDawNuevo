import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.services";
import { inject } from "@angular/core";
import { RolesEnum } from "../enums/roles.enum";


export const adminGuard: CanActivateFn = (route, state) => {
    const service = inject(AuthService);
    if(!service.isLoggedIn()){
        inject(Router).navigateByUrl('login');
    }
    if(!service.hasRole(RolesEnum.ADMINISTRADOR)){
        inject(Router).navigateByUrl('login')
    }
    return true
}