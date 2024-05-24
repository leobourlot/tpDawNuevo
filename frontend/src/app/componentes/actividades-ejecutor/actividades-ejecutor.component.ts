import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { Actividad } from '../../model/actividad.model';
import { BaseComponent } from '../base/base.component';
import { OperacionActividadEnum } from '../../enums/operacion-actividad.enum'; // Importa el enum aquí
import { ActividadesService } from '../../services/actividades.service';

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

  constructor(private actividadService: ActividadesService) {}

  ngOnInit(): void {
//    this.loadActividades();
  }
/*
  loadActividades() {
    // this.actividadService.gettareasEjecutor().subscribe((data) => {
    //   this.actividades = data;
      console.log('Actividades del ejecutor:', this.actividades);
    // });
  }
*/
  eliminarActividad() {
  
  console.log('Eliminar Actividad');
}
  Finalizar() {
    console.log('Finalizar');
  }
}