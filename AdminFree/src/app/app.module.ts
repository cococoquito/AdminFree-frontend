import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShellModule } from './modules/shell/shell.module';
import { CoreModule } from './modules/core/core.module';
import { AppComponent } from './app.component';

/**
 * Modulo principal de la aplicacion AdminFree, contiene
 * todas los componentes y modulos de inicio
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ShellModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
