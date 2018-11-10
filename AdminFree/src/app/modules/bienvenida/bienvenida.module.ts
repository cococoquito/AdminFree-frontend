import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { BienvenidaComponent } from './bienvenida-component/bienvenida.component';
import { ShellComponent } from './../shell/shell/shell.component';

/**
 * Modulo de bienvenida de la aplicacion, se muestra
 * despues de que el usuario inicia sesion en el sistema
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
            component: BienvenidaComponent
          }
        ]
      }
    ]),
    SharedModule
  ],
  declarations: [BienvenidaComponent]
})
export class BienvenidaModule {}
