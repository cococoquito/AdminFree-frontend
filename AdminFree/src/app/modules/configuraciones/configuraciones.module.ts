import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { PruebaComponent } from './prueba/prueba.component';
import { RouterConstant } from './../../constants/router.constant';

/**
 * Modulo que contiene todas las configuraciones iniciales de la aplicacion
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: RouterConstant.ROUTER_ADMIN_USERS,
        component: AdminUsuariosComponent
      },
      {
        path: 'prueba',
        component: PruebaComponent
      }
    ]),
    SharedModule
  ],
  declarations: [
    AdminUsuariosComponent,
    PruebaComponent
  ]
})
export class ConfiguracionesModule { }
