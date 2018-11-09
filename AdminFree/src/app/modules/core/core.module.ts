import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestInterceptor } from './../../interceptors/http-request.interceptor';
import { AuthGuard } from './../../auth-guard/auth.guard';
import { SelectivePreload } from './../../services/selective-preload.service';
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
        canActivate: [AuthGuard],
        loadChildren: '../login/login.module#LoginModule'
      },
      {
        path: RouterConstant.ERROR,
        loadChildren: '../pages-error/pages-error.module#PagesErrorModule'
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
    ], { preloadingStrategy: SelectivePreload }),
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
    AuthGuard,
    SelectivePreload
  ]
})
export class CoreModule {}
