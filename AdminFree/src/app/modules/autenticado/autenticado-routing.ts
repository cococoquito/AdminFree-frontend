import { Routes } from '@angular/router';
import { PrivilegiosGuard } from './../../auth-guard/privilegios.guard';
import { ShellComponent } from './../shell/shell/shell.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { CuentaUserComponent } from './cuenta-user/cuenta-user.component';
import { ModulosConstant } from './../../constants/modulos.constant';
import { RouterConstant } from './../../constants/router.constant';

/**
 * Constante que contiene todos los routers que el usuario
 * puede acceder despues de que se autentique en la app
 *
 * @author Carlos Andres Diaz
 */
export const ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: RouterConstant.ROUTER_BIENVENIDA,
        component: BienvenidaComponent
      },
      {
        path: RouterConstant.ROUTER_CUENTA_USER,
        component: CuentaUserComponent
      },
      {
        path: RouterConstant.ROUTER_CORRESPONDENCIA,
        canActivate: [PrivilegiosGuard],
        data: { preload: true, token: ModulosConstant.TK_CORRESPONDENCIA },
        loadChildren: '../correspondencia/correspondencia.module#CorrespondenciaModule'
      },
      {
        path: RouterConstant.ROUTER_ARCHIVO_GESTION,
        canActivate: [PrivilegiosGuard],
        data: { preload: true, token: ModulosConstant.TK_ARCHIVO_GESTION },
        loadChildren: '../archivo-gestion/archivo-gestion.module#ArchivoGestionModule'
      },
      {
        path: RouterConstant.ROUTER_REPORTES,
        canActivate: [PrivilegiosGuard],
        data: { preload: true, token: ModulosConstant.TK_REPORTES },
        loadChildren: '../reportes/reportes.module#ReportesModule'
      },
      {
        path: RouterConstant.ROUTER_CONFIGURACIONES,
        canActivate: [PrivilegiosGuard],
        data: { preload: true, token: ModulosConstant.TK_CONFIGURACIONES },
        loadChildren: '../configuraciones/configuraciones.module#ConfiguracionesModule'
      }
    ]
  }
];
