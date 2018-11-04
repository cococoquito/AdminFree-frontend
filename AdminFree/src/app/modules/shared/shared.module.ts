import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoEspaciosBlancoDirective } from './../../directives/validators/espacios-blanco/no-espacios-blanco.directive';
import { AutofocusDirective } from './../../directives/focus/autofocus.directive';

/**
 * Modulo que contiene los modulos, componentes comunes
 * para ser compartidos a los demas modulos
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [
    CommonModule,
    FormsModule,
    NoEspaciosBlancoDirective,
    AutofocusDirective
  ],
  declarations: [NoEspaciosBlancoDirective, AutofocusDirective]
})
export class SharedModule {}
