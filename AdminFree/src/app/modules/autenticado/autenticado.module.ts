import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellModule } from './../shell/shell.module';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { CuentaUserComponent } from './cuenta-user/cuenta-user.component';
import { ROUTES } from './autenticado-routing';

/**
 * Modulo que contiene todos los artefactos que el usuario
 * puede acceder despues de que se autentique en la app
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    ShellModule
  ],
  declarations: [
    BienvenidaComponent,
    CuentaUserComponent
  ]
})
export class AutenticadoModule { }
