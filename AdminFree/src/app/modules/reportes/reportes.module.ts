import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ShellComponent } from './../shell/shell/shell.component';
import { GenerarReporteComponent } from './generar-reporte/generar-reporte.component';

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
        path: '',
        component: ShellComponent,
        children: [
          {
            path: '',
            component: GenerarReporteComponent
          }
        ]
      }
    ]),
    SharedModule
  ],
  declarations: [GenerarReporteComponent]
})
export class ReportesModule { }
