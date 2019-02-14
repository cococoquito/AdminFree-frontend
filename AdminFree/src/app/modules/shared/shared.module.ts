import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { SharedCommonModule } from './shared-common.module';
import { TransversalModule } from '../transversal/transversal.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ConsecutivoPipe } from '../../pipes/consecutivo.pipe';

/**
 * Modulo que contiene los artefactos para ser compartidos
 * para los modulos que se visualizan despues de la autenticacion
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    SharedCommonModule,
    TransversalModule,
    TableModule,
    PanelModule,
    DialogModule,
    StepsModule,
    RadioButtonModule,
    TooltipModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    ProgressBarModule,
    KeyFilterModule
  ],
  exports: [
    SharedCommonModule,
    TransversalModule,
    TableModule,
    PanelModule,
    DialogModule,
    StepsModule,
    RadioButtonModule,
    TooltipModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    ProgressBarModule,
    KeyFilterModule,
    ConsecutivoPipe
  ],
  declarations: [
    ConsecutivoPipe
  ]
})
export class SharedModule {}
