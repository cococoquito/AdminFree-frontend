import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { SeriesDocumentalesComponent } from './series-documentales/series-documentales.component';
import { PruebaComponent } from './prueba/prueba.component';

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
        path: 'series',
        component: SeriesDocumentalesComponent
      },
      {
        path: 'prueba',
        component: PruebaComponent
      }
    ]),
    SharedModule
  ],
  declarations: [SeriesDocumentalesComponent, PruebaComponent]
})
export class ArchivoGestionModule { }
