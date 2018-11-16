import { Routes } from '@angular/router';
import { AuthGuard } from './../../auth-guard/auth.guard';
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
        path: RouterConstant.BIENVENIDA,
        canActivate: [AuthGuard],
        component: BienvenidaComponent
      },
      {
        path: RouterConstant.ADMIN_CUENTA_USER,
        canActivate: [AuthGuard],
        component: CuentaUserComponent
      },
      {
        path: RouterConstant.CORRESPONDENCIA,
        canActivate: [AuthGuard],
        data: { preload: true, token: ModulosConstant.TK_CORRESPONDENCIA },
        loadChildren: '../correspondencia/correspondencia.module#CorrespondenciaModule'
      },
      {
        path: RouterConstant.ARCHIVO_GESTION,
        canActivate: [AuthGuard],
        data: { preload: true, token: ModulosConstant.TK_ARCHIVO_GESTION },
        loadChildren: '../archivo-gestion/archivo-gestion.module#ArchivoGestionModule'
      },
      {
        path: RouterConstant.REPORTES,
        canActivate: [AuthGuard],
        data: { preload: true, token: ModulosConstant.TK_REPORTES },
        loadChildren: '../reportes/reportes.module#ReportesModule'
      },
      {
        path: RouterConstant.CONFIGURACIONES,
        canActivate: [AuthGuard],
        data: { preload: true, token: ModulosConstant.TK_CONFIGURACIONES },
        loadChildren: '../configuraciones/configuraciones.module#ConfiguracionesModule'
      }
    ]
  }
];
