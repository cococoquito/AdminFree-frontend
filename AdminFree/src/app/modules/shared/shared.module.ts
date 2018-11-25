import { NgModule } from '@angular/core';
import {TableModule} from 'primeng/table';
import { SharedCommonModule } from './shared-common.module';

/**
 * Modulo que contiene los artefactos para ser compartidos
 * para los modulos que se visualizan despues de la autenticacion
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    SharedCommonModule,
    TableModule
  ],
  exports: [
    SharedCommonModule,
    TableModule
  ],
  declarations: [
  ]
})
export class SharedModule {}
