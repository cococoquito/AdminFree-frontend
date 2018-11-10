import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ShellComponent } from './../shell/shell/shell.component';
import { SolicitarConsecutivoComponent } from './solicitar-consecutivo/solicitar-consecutivo.component';

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
        path: '',
        component: ShellComponent,
        children: [
          {
            path: '',
            component: SolicitarConsecutivoComponent
          }
        ]
      }
    ]),
    SharedModule
  ],
  declarations: [SolicitarConsecutivoComponent]
})
export class CorrespondenciaModule {}
