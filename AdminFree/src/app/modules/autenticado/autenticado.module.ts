import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { CuentaUserComponent } from './cuenta-user/cuenta-user.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BienvenidaComponent, CuentaUserComponent]
})
export class AutenticadoModule { }
