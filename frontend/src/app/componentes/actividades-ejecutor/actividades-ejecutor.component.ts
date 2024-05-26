import { Component, OnInit, ViewChild } from '@angular/core';
//import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Table, TableModule } from 'primeng/table';
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
import { AuditoriaActividadDto } from '../../dtos/auditoria-actividades.dto';
import { AuditoriaActividadesService } from '../../services/auditoriaactividades.services';
import { Actividad } from '../../model/actividad.model';
import { OperacionActividadEnum } from '../../enums/operacion-actividad.enum';

/**
 * Pantalla para los usuarios con el rol de EJECUTOR
 */
@Component({
  selector: 'app-actividades-ejecutor',
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
    BaseComponent
  ],
  templateUrl: './actividades-ejecutor.component.html',
  styleUrl: './actividades-ejecutor.component.scss',
})
// export class ActividadesEjecutorComponent implements OnInit {
export class ActividadesEjecutorComponent {
  

  constructor(private actividadService: ActividadesService) {}

  
}