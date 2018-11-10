import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ShellComponent } from './../shell/shell/shell.component';
import { SeriesDocumentalesComponent } from './series-documentales/series-documentales.component';

/**
 * Modulo que contiene todos los procesos de negocio
 * para el archivo de gestion de correspondencia
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
            component: SeriesDocumentalesComponent
          }
        ]
      }
    ]),
    SharedModule
  ],
  declarations: [SeriesDocumentalesComponent]
})
export class ArchivoGestionModule { }