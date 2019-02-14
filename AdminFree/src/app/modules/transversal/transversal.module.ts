import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputswitchComponent } from './inputswitch/inputswitch.component';

/**
 * Modulo que contiene todos los componentes transversales
 * para los demas modulos del negocio
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InputswitchComponent
  ],
  exports: [
    InputswitchComponent
  ]
})
export class TransversalModule {}
