import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard/auth.guard';
import { RouterConstant } from './constants/router.constant';

/**
 * Constante que contiene todos los router de cada modulo del
 * core de la aplicacion, esta constante es importado solamente
 * del modulo core o principal 'app.module.ts'
 *
 * @author Carlos Andres Diaz
 */
export const ROUTES: Routes = [
  {
    path: RouterConstant.CLIENTES,
    loadChildren: './modules/clientes/clientes.module#ClientesModule'
  },
  {
    path: RouterConstant.LOGIN,
    canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: RouterConstant.BIENVENIDA,
    canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: './modules/bienvenida/bienvenida.module#BienvenidaModule'
  },
  {
    path: RouterConstant.ARCHIVO_GESTION,
    canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: './modules/archivo-gestion/archivo-gestion.module#ArchivoGestionModule'
  },
  {
    path: RouterConstant.CORRESPONDENCIA,
    canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: './modules/correspondencia/correspondencia.module#CorrespondenciaModule'
  },
  {
    path: RouterConstant.REPORTES,
    canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: './modules/reportes/reportes.module#ReportesModule'
  },
  {
    path: RouterConstant.CONFIGURACIONES,
    canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: './modules/configuraciones/configuraciones.module#ConfiguracionesModule'
  },
  {
    path: RouterConstant.ERROR,
    loadChildren: './modules/pages-error/pages-error.module#PagesErrorModule'
  },
  {
    path: '',
    redirectTo: RouterConstant.LOGIN,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: RouterConstant.ERROR,
    pathMatch: 'full'
  }
];
