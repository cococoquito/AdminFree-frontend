import { NgModule } from '@angular/core';
import { ShellModule } from '../shell/shell.module';

/**
 * Modulo que contiene los artefactos para ser compartidos
 * para los modulos que se visualizan despues de la autenticacion
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    ShellModule
  ],
  exports: [
    ShellModule
  ],
  declarations: [
  ]
})
export class SharedModule {}
