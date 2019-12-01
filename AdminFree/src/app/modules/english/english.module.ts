import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { SeriesComponent } from './series/series.component';
import { CreateSeriesComponent } from './create-series/create-series.component';
import { RouterConstant } from './../../constants/router.constant';
import { SharedModule } from '../shared/shared.module';
import { EnglishService } from 'src/app/services/english.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

/**
 * Modulo que contiene los componentes y servicios para la
 * aplicacion de estudio de ingles
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SeriesComponent
      },
      {
        path: RouterConstant.ROUTER_CREATE_SERIES,
        component: CreateSeriesComponent
      }
    ]),
    SharedModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule
  ],
  declarations: [
    SeriesComponent,
    CreateSeriesComponent
  ],
  providers: [
    ConfirmationService,
    MessageService,
    EnglishService
  ]
})
export class EnglishModule {}
