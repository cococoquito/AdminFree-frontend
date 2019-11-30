import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeriesComponent } from './series/series.component';
import { CreateSeriesComponent } from './create-series/create-series.component';
import { RouterConstant } from './../../constants/router.constant';
import { SharedModule } from '../shared/shared.module';

/**
 * Modulo que contiene los componentes y servicios para la
 * aplicacion de estudio de ingles
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SeriesComponent
      },
      {
        path: RouterConstant.ROUTER_CREATE_SERIES,
        component: CreateSeriesComponent
      }
    ]),
    SharedModule
  ],
  declarations: [
    SeriesComponent,
    CreateSeriesComponent
  ]
})
export class EnglishModule {}
