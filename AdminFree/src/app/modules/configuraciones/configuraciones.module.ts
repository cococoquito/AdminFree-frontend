import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ShellComponent } from './../shell/shell/shell.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';

/**
 * Modulo que contiene todas las configuraciones iniciales de la aplicacion
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
            component: AdminUsuariosComponent
          }
        ]
      }
    ]),
    SharedModule
  ],
  declarations: [
    AdminUsuariosComponent
  ]
})
export class ConfiguracionesModule { }
