import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
import { SelectivePreload } from './services/selective-preload.service';
import { PrivilegiosGuard } from './auth-guard/privilegios.guard';
import { AutenticacionGuard } from './auth-guard/autenticacion.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './directives/spinner/spinner.component';
import { ROUTES } from './app-routing';

/**
 * Modulo principal de la aplicacion AdminFree, contiene
 * todos los componentes y modulos de inicio
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES, { preloadingStrategy: SelectivePreload }),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    SelectivePreload,
    AutenticacionGuard,
    PrivilegiosGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
