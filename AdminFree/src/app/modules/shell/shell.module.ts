import { NgModule } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { SharedCommonModule } from './../shared/shared-common.module';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { UserAccountComponent } from './header/user-account/user-account.component';
import { MenuComponent } from './menus/menu/menu.component';
import { MenuItemComponent } from './menus/menu-item/menu-item.component';
import { MenuItemDetailComponent } from './menus/menu-item-detail/menu-item-detail.component';
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
    SharedCommonModule,
    MenuModule,
    SidebarModule,
    ConfirmDialogModule
  ],
  declarations: [
    ShellComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    MenuComponent,
    MenuItemComponent,
    MenuItemDetailComponent,
    UserAccountComponent
  ],
  exports: [
    ShellComponent,
    SharedCommonModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class ShellModule {}
