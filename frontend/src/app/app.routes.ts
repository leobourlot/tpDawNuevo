import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { ActividadesAdminComponent } from './componentes/actividades-admin/actividades-admin.component';
import { adminGuard } from './guards/admin.guard';
import { ActividadesEjecutorComponent } from './componentes/actividades-ejecutor/actividades-ejecutor.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'admin',
        loadComponent: () =>
            import('./componentes/actividades-admin/actividades-admin.component').then(
                (mod) => mod.ActividadesAdminComponent),
        canActivate: [adminGuard],
    },
    {
    path:'ejecutor',
        component: ActividadesEjecutorComponent

    },
    {
    path:'usuarios',
    loadComponent: () =>
        import('./componentes/usuarios/usuarios.component').then(
            (mod) => mod.UsuariosComponent),
    canActivate: [adminGuard],

    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
