import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { BodyComponent } from './body/body.component';
import { ContentComponent } from './content/content.component';
import { BarUserComponent } from './bar-user/bar-user.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menus/menu/menu.component';
import { MenuItemComponent } from './menus/menu-item/menu-item.component';
import { HeaderComponent } from './header/header.component';

/**
 * Modulo que contiene todos los componentes y modulos que define
 * el esqueleto de la aplicacion web de ADMINFREE
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    SidebarModule
  ],
  declarations: [
    BodyComponent,
    ContentComponent,
    BarUserComponent,
    FooterComponent,
    MenuComponent,
    MenuItemComponent,
    HeaderComponent
  ],
  exports: [BodyComponent]
})
export class ShellModule {}
