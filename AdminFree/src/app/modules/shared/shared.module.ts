import { NgModule } from '@angular/core';
import { SharedCommonModule } from './shared-common.module';

/**
 * Modulo que contiene los artefactos para ser compartidos
 * para los modulos que se visualizan despues de la autenticacion
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    SharedCommonModule
  ],
  exports: [
    SharedCommonModule
  ],
  declarations: [
  ]
})
export class SharedModule {}
