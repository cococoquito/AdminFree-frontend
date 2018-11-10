import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ShellComponent } from './../shell/shell/shell.component';
import { ConfiguracionesAppComponent } from './configuraciones-app/configuraciones-app.component';
import { ConfiguracionesUserComponent } from './configuraciones-user/configuraciones-user.component';

/**
 * Modulo que contiene todas las configuraciones
 * iniciales de la aplicacion
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
            component: ConfiguracionesAppComponent
          }
        ]
      }
    ]),
    SharedModule
  ],
  declarations: [
    ConfiguracionesAppComponent,
    ConfiguracionesUserComponent
  ]
})
export class ConfiguracionesModule { }
