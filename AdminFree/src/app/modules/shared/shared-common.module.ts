import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoEspaciosBlancoDirective } from './../../directives/validators/espacios-blanco/no-espacios-blanco.directive';
import { AutofocusDirective } from './../../directives/focus/autofocus.directive';
import { CopyPageDirective } from './../../directives/copy-page/copy-page';

/**
 * Modulo que contiene los artefactos comunes,
 * CommonModule, FormsModule y directivas, este modulo
 * no puede contener mas artefactos, dado que es utilizado
 * en el login y esta debe ser liviano en descargar en el browser
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NoEspaciosBlancoDirective,
    AutofocusDirective,
    CopyPageDirective
  ],
  declarations: [
    NoEspaciosBlancoDirective,
    AutofocusDirective,
    CopyPageDirective
  ]
})
export class SharedCommonModule {}
