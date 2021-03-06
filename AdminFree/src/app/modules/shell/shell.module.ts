import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedCommonModule } from './../shared/shared-common.module';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { UserAccountComponent } from './header/user-account/user-account.component';
import { MenuComponent } from './menus/menu/menu.component';
import { ContentComponent } from './content/content.component';
import { TitleComponent } from './title/title.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

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
    PanelMenuModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule
  ],
  declarations: [
    ShellComponent,
    HeaderComponent,
    ContentComponent,
    MenuComponent,
    UserAccountComponent,
    TitleComponent,
    BreadcrumbComponent
  ],
  exports: [
    ShellComponent
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class ShellModule {}
