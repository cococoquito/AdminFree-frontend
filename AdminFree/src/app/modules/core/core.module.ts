import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestInterceptor } from './../../interceptors/http-request.interceptor';
import { AuthGuard } from './../../auth-guard/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterConstant } from './../../constants/router.constant';

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
        path: RouterConstant.CLIENTES,
        loadChildren: '../clientes/clientes.module#ClientesModule'
      },
      {
        path: RouterConstant.LOGIN,
        loadChildren: '../login/login.module#LoginModule'
      },
      {
        path: RouterConstant.AUTENTICADO,
        canActivate: [AuthGuard],
        loadChildren: '../adminfree/adminfree.module#AdminfreeModule'
      },
      {
        path: '',
        redirectTo: RouterConstant.LOGIN,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: RouterConstant.LOGIN,
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
    },
    AuthGuard
  ]
})
export class CoreModule {}
