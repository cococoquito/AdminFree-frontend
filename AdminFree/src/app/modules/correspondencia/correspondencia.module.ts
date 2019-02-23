import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { SolicitarConsecutivosComponent } from './solicitud-consecutivos/solicitar-consecutivos/solicitar-consecutivos.component';
import { IngresoInformacionComponent } from './solicitud-consecutivos/ingreso-informacion/ingreso-informacion.component';
import { ConfirmacionComponent } from './solicitud-consecutivos/confirmacion/confirmacion.component';
import { ConsecutivoGeneradoComponent } from './solicitud-consecutivos/consecutivo-generado/consecutivo-generado.component';
import { ConsecutivosSolicitadosComponent } from './consecutivos-solicitados/consecutivos-solicitados.component';
import { RouterConstant } from './../../constants/router.constant';

/**
 * Modulo que contiene todos los procesos de negocio
 * para la administracion de los consecutivo de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: RouterConstant.ROUTER_SOLICITAR_CONSECUTIVOS,
        component: SolicitarConsecutivosComponent
      },
      {
        path: RouterConstant.ROUTER_CONSECUTIVOS_SOLICITADOS,
        component: ConsecutivosSolicitadosComponent
      }
    ]),
    SharedModule
  ],
  declarations: [
    SolicitarConsecutivosComponent,
    IngresoInformacionComponent,
    ConfirmacionComponent,
    ConsecutivoGeneradoComponent,
    ConsecutivosSolicitadosComponent
  ]
})
export class CorrespondenciaModule {}
