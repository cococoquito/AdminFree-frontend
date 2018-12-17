import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { SharedCommonModule } from './shared-common.module';
import { InputswitchComponent } from './../../directives/inputswitch/inputswitch.component';

/**
 * Modulo que contiene los artefactos para ser compartidos
 * para los modulos que se visualizan despues de la autenticacion
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    SharedCommonModule,
    TableModule,
    PanelModule,
    DialogModule,
    StepsModule
  ],
  exports: [
    SharedCommonModule,
    TableModule,
    PanelModule,
    DialogModule,
    StepsModule,
    InputswitchComponent
  ],
  declarations: [
    InputswitchComponent
  ]
})
export class SharedModule {}
