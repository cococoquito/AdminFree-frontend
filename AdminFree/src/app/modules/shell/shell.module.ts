import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './header/user/user.component';
import { MenuComponent } from './menus/menu/menu.component';
import { MenuItemComponent } from './menus/menu-item/menu-item.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';

/**
 * Modulo que contiene todos los componentes y modulos que define
 * el esqueleto de la aplicacion web de ADMINFREE
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ShellComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    MenuComponent,
    MenuItemComponent,
    UserComponent
  ],
  exports: [ ShellComponent ]
})
export class ShellModule {}
