import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminCamposComponent } from './admin-campos/admin-campos.component';
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
        path: RouterConstant.ROUTER_ADMIN_CAMPOS,
        component: AdminCamposComponent
      }
    ]),
    SharedModule
  ],
  declarations: [
    AdminUsuariosComponent,
    AdminCamposComponent
  ]
})
export class ConfiguracionesModule { }
