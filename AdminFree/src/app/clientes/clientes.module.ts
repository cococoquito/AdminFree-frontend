import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminClientesComponent } from './admin-clientes/admin-clientes.component';

/**
 * Son los routes del modulo de administracion de clientes
 */
const routes: Routes = [
  {
    path: '',
    component: AdminClientesComponent
  }
];

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
    RouterModule.forChild(routes)
  ],
  declarations: [AdminClientesComponent]
})
export class ClientesModule { }
