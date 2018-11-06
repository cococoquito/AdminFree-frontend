import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './modules/core/core.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './directives/spinner/spinner.component';

/**
 * Modulo principal de la aplicacion AdminFree, contiene
 * todas los componentes y modulos de inicio
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
