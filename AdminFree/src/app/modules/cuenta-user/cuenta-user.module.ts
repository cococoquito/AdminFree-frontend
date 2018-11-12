import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ShellComponent } from './../shell/shell/shell.component';
import { AdminCuentaUserComponent } from './admin-cuenta-user/admin-cuenta-user.component';

/**
 * Modulo para la administracion de la cuenta del usuario
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
            component: AdminCuentaUserComponent
          }
        ]
      }
    ]),
    SharedModule
  ],
  declarations: [AdminCuentaUserComponent]
})
export class CuentaUserModule {}
