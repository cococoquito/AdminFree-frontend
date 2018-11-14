import { NgModule } from '@angular/core';
import { SharedLoginModule } from '../shared/shared-login.module';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { UserAccountComponent } from './header/user-account/user-account.component';
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
    SharedLoginModule,
    MenuModule,
    SidebarModule
  ],
  declarations: [
    ShellComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    MenuComponent,
    MenuItemComponent,
    UserAccountComponent
  ],
  exports: [
    ShellComponent,
    SharedLoginModule
  ]
})
export class ShellModule {}
