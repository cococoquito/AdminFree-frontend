import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminClientesComponent } from './admin-clientes/admin-clientes.component';

/**
 * Modulo que contiene los componentes y servicios para la
 * administracion de clientes del sistema
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminClientesComponent
      }
    ])
  ],
  declarations: [AdminClientesComponent]
})
export class ClientesModule {}
