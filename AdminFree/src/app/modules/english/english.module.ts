import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from '../shared/shared-common.module';
import { SeriesComponent } from './series/series.component';

/**
 * Modulo que contiene los componentes y servicios para la
 * administracion de clientes del sistema
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SeriesComponent
      }
    ]),
    SharedCommonModule
  ],
  declarations: [SeriesComponent]
})
export class EnglishModule {}
