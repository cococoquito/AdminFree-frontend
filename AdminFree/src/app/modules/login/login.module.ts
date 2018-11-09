import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoEspaciosBlancoDirective } from './../../directives/validators/espacios-blanco/no-espacios-blanco.directive';
import { AutofocusDirective } from './../../directives/focus/autofocus.directive';
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
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    NoEspaciosBlancoDirective,
    AutofocusDirective
  ]
})
export class LoginModule {}
