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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SharedCommonModule } from './shared-common.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConsecutivoPipe } from '../../pipes/consecutivo.pipe';
import { DatePipe } from '@angular/common';
import { InputswitchComponent } from './inputswitch/inputswitch.component';
import { DetalleCampoComponent } from './detalle-campo/detalle-campo.component';
import { DetalleNomenclaturaComponent } from './detalle-nomenclatura/detalle-nomenclatura.component';
import { FiltroConsecutivosComponent } from './filtro-consecutivos/filtro-consecutivos.component';
import { ConsecutivoInfoGeneralComponent } from './consecutivo-info-general/consecutivo-info-general.component';

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
    StepsModule,
    RadioButtonModule,
    TooltipModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    ProgressBarModule,
    OverlayPanelModule,
    KeyFilterModule,
    CheckboxModule,
    AutoCompleteModule
  ],
  declarations: [
    ConsecutivoPipe,
    InputswitchComponent,
    DetalleCampoComponent,
    DetalleNomenclaturaComponent,
    FiltroConsecutivosComponent,
    ConsecutivoInfoGeneralComponent
  ],
  exports: [
    SharedCommonModule,
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
    OverlayPanelModule,
    KeyFilterModule,
    CheckboxModule,
    AutoCompleteModule,
    ConsecutivoPipe,
    InputswitchComponent,
    DetalleCampoComponent,
    DetalleNomenclaturaComponent,
    FiltroConsecutivosComponent,
    ConsecutivoInfoGeneralComponent
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule {}
