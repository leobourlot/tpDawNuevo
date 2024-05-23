import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { ActividadesAdminComponent } from './componentes/actividades-admin/actividades-admin.component';
import { ActividadesEjecutorComponent } from './componentes/actividades-ejecutor/actividades-ejecutor.component';

export const routes: Routes = [
    {
    path:'login',
    component: LoginComponent
    },
    {
    path:'admin',
    component: ActividadesAdminComponent
    },
    {
    path:'ejecutor',
    component: ActividadesEjecutorComponent
    },
    {
        path:'**',
        redirectTo:'login'
    }
];
