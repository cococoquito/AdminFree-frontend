import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedLoginModule } from './../shared/shared-login.module';
import { LoginComponent } from './login-component/login.component';

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
    SharedLoginModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {}
