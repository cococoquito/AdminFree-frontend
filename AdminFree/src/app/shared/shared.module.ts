import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Modulo que contiene los modulos, componentes comunes
 * para ser compartidos a los demas modulos
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule],
  declarations: []
})
export class SharedModule {}
