import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpRequestInterceptor } from './../security/http-request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * Son los routes de inicio de la aplicacion
 */
const routes: Routes = [
  {
    path: 'zaqwsx',
    loadChildren: '../clientes/clientes.module#ClientesModule'
  }
];

/**
 * Modulo Core de la aplicacion, aca se debe agregar todos los modulos,
 * servicios, que solo se crea una sola vez en el contexto del usuario
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ]
})
export class CoreModule { }
