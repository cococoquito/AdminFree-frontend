import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
    CommonModule,
    FormsModule
  ],
  declarations: [ AdminClientesComponent ]
})
export class ClientesModule {}
