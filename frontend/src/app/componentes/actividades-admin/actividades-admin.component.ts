import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ActividadService } from '../../services/actividad.services';
import { Actividad } from '../../model/actividad.model';
import { BaseComponent } from '../base/base.component';
import { OperacionActividadEnum } from '../../enums/operacion-actividad.enum'; 

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [CommonModule, ButtonModule, HttpClientModule, BaseComponent],
  templateUrl: './actividades-admin.component.html',
  styleUrls: ['./actividades-admin.component.scss']
})
export class ActividadesAdminComponent implements OnInit {
  actividades: Actividad[] = [];
  operacionEnum = OperacionActividadEnum; 

  constructor(private actividadService: ActividadService) {}

  ngOnInit() {
    this.loadActividades();
  }

  loadActividades() {
    this.actividadService.getActividades().subscribe((data) => {
      this.actividades = data;
    });
  }

  crearActividad() {
    // Implementar la lógica para la creación de actividades
    console.log('Crear Actividad');
  }
}