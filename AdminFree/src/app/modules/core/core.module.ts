import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestInterceptor } from './../../interceptors/http-request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * Modulo Core de la aplicacion, aca se debe agregar todos los modulos,
 * servicios, que solo se crea una sola vez en el contexto del usuario
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'zaqwsx',
        loadChildren: '../clientes/clientes.module#ClientesModule'
      },
      {
        path: 'login',
        loadChildren: '../login/login.module#LoginModule'
      },
      {
        path: 'autenticado',
        loadChildren: '../adminfree/adminfree.module#AdminfreeModule'
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
