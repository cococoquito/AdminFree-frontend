import { Routes } from '@angular/router';
import { AutenticacionGuard } from './auth-guard/autenticacion.guard';
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
    path: RouterConstant.ROUTER_ENGLISH,
    loadChildren: './modules/english/english.module#EnglishModule'
  },
  {
    path: RouterConstant.ROUTER_CLIENTES,
    loadChildren: './modules/clientes/clientes.module#ClientesModule'
  },
  {
    path: RouterConstant.ROUTER_LOGIN,
    canActivate: [AutenticacionGuard],
    data: { preload: true },
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: RouterConstant.ROUTER_AUTENTICADO,
    canActivate: [AutenticacionGuard],
    data: { preload: true },
    loadChildren: './modules/autenticado/autenticado.module#AutenticadoModule'
  },
  {
    path: RouterConstant.ROUTER_ERROR,
    loadChildren: './modules/pages-error/pages-error.module#PagesErrorModule'
  },
  {
    path: '',
    redirectTo: RouterConstant.ROUTER_LOGIN,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: RouterConstant.ROUTER_ERROR,
    pathMatch: 'full'
  }
];
