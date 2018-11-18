import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { GenerarReporteComponent } from './generar-reporte/generar-reporte.component';
import { PruebaComponent } from './prueba/prueba.component';

/**
 * Modulo que contiene todos los procesos de negocio
 * para la generacion de reportes de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'generar',
        component: GenerarReporteComponent
      },
      {
        path: 'prueba',
        component: PruebaComponent
      }
    ]),
    SharedModule
  ],
  declarations: [GenerarReporteComponent, PruebaComponent]
})
export class ReportesModule { }
