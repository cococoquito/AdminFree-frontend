import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedCommonModule } from './../shared/shared-common.module';
import { AdminClientesComponent } from './admin-clientes/admin-clientes.component';

/**
 * Modulo que contiene los componentes y servicios para la
 * administracion de clientes del sistema
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminClientesComponent
      }
    ]),
    SharedCommonModule
  ],
  declarations: [AdminClientesComponent]
})
export class ClientesModule {}
