import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { DetalleNomenclaturaComponent } from './detalle-nomenclatura/detalle-nomenclatura.component';
import { SolicitarConsecutivosComponent } from './solicitud-consecutivos/solicitar-consecutivos/solicitar-consecutivos.component';
import { IngresoInformacionComponent } from './solicitud-consecutivos/ingreso-informacion/ingreso-informacion.component';
import { ConfirmacionComponent } from './solicitud-consecutivos/confirmacion/confirmacion.component';
import { ConsecutivoGeneradoComponent } from './solicitud-consecutivos/consecutivo-generado/consecutivo-generado.component';
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
      }
    ]),
    SharedModule
  ],
  declarations: [
    DetalleNomenclaturaComponent,
    SolicitarConsecutivosComponent,
    IngresoInformacionComponent,
    ConfirmacionComponent,
    ConsecutivoGeneradoComponent
  ]
})
export class CorrespondenciaModule {}
