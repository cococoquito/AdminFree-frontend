import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpRequestInterceptor } from './../security/http-request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'zaqwsx',
    loadChildren: '../clientes/clientes.module#ClientesModule'
  }
];

/**
 * Modulo Core de la aplicacion, aca se debe agregar todos los modulos,
 * servicios, que solo se crea una sola vez en el contexto del usuario
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ]
})
export class CoreModule { }
