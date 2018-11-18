import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { SolicitarConsecutivoComponent } from './solicitar-consecutivo/solicitar-consecutivo.component';
import { PruebaComponent } from './prueba/prueba.component';

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
        path: 'solicitar',
        component: SolicitarConsecutivoComponent
      },
      {
        path: 'prueba',
        component: PruebaComponent
      }
    ]),
    SharedModule
  ],
  declarations: [SolicitarConsecutivoComponent, PruebaComponent]
})
export class CorrespondenciaModule {}
