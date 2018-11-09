import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
import { AuthGuard } from './auth-guard/auth.guard';
import { SelectivePreload } from './services/selective-preload.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './directives/spinner/spinner.component';
import { ROUTES } from './app.routing';

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
    AuthGuard,
    SelectivePreload
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
