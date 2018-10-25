import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminClientesComponent } from './admin-clientes/admin-clientes.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminClientesComponent
  }
];

/**
 * Modulo que contiene los componentes y servicios para la
 * administracion de clientes del sistema
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
