import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { SolicitarConsecutivosComponent } from './solicitar-consecutivos/solicitar-consecutivos.component';
import { DetalleNomenclaturaComponent } from './detalle-nomenclatura/detalle-nomenclatura.component';
import { CamposInformacionComponent } from './campos-informacion/campos-informacion.component';
import { AdminDocumentosComponent } from './admin-documentos/admin-documentos.component';
import { SolicitarConfirmacionComponent } from './solicitar-confirmacion/solicitar-confirmacion.component';
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
    SolicitarConsecutivosComponent,
    DetalleNomenclaturaComponent,
    CamposInformacionComponent,
    AdminDocumentosComponent,
    SolicitarConfirmacionComponent
  ]
})
export class CorrespondenciaModule {}
