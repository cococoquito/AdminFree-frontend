import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { LoginComponent } from './login.component';

/**
 * Modulo para la autenticacion del sistema
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ]),
    SharedModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
