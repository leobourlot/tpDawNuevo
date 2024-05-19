import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ActividadService } from '../../services/actividad.service';
import { Actividad } from '../model/actividad.model';
import { BaseComponent } from '../base/base.component';
import { OperacionActividadEnum } from '../../enums/operacion-actividad.enum'; // Importa el enum aquí

@Component({
  selector: 'app-actividades-ejecutor',
  standalone: true,
  imports: [CommonModule, ButtonModule, HttpClientModule, BaseComponent],
  templateUrl: './actividades-ejecutor.component.html',
  styleUrls: ['./actividades-ejecutor.component.scss']
})
export class ActividadesEjecutorComponent implements OnInit {
  actividades: Actividad[] = [];
  operacionEnum = OperacionActividadEnum; 

  constructor(private actividadService: ActividadService) {}

  ngOnInit(): void {
    this.loadActividades();
  }

  loadActividades() {
    this.actividadService.gettareasEjecutor().subscribe((data) => {
      this.actividades = data;
      console.log('Actividades del ejecutor:', this.actividades);
    });
  }
  eliminarActividad() {
  
  console.log('Eliminar Actividad');
}
  Finalizar() {
    console.log('Finalizar');
  }
}