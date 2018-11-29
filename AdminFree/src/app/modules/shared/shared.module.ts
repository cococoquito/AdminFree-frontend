import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { SharedCommonModule } from './shared-common.module';
import { TitleComponent } from './title/title.component';

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
    CheckboxModule,
    MessagesModule,
    DialogModule
  ],
  exports: [
    SharedCommonModule,
    TableModule,
    PanelModule,
    CheckboxModule,
    MessagesModule,
    DialogModule,
    TitleComponent
  ],
  declarations: [
    TitleComponent
  ]
})
export class SharedModule {}
