import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AdminSeriesDocumentalesComponent } from './admin-series-documentales/admin-series-documentales.component';
import { TrdComponent } from './trd/trd.component';
import { ArchivarConsecutivosComponent } from './archivar-consecutivos/archivar-consecutivos.component';
import { RouterConstant } from '../../constants/router.constant';

/**
 * Contiene todos los procesos de negocio para el modulo de archivo de gestion
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: RouterConstant.ROUTER_ADMIN_SERIES_DOCUMENTALES,
        component: AdminSeriesDocumentalesComponent
      },
      {
        path: RouterConstant.ROUTER_TRD,
        component: TrdComponent
      },
      {
        path: RouterConstant.ROUTER_ARCHIVAR_CONSECUTIVOS,
        component: ArchivarConsecutivosComponent
      }
    ]),
    SharedModule
  ],
  declarations: [
    AdminSeriesDocumentalesComponent,
    TrdComponent,
    ArchivarConsecutivosComponent
  ]
})
export class ArchivoGestionModule { }
