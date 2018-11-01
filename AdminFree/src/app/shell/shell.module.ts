import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { ContentComponent } from './content/content.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { BarUserComponent } from './bar-user/bar-user.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menus/menu/menu.component';
import { MenuItemComponent } from './menus/menu-item/menu-item.component';
import { RouterModule } from '@angular/router';
import {MenuModule} from 'primeng/menu';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    SidebarModule
  ],
  declarations: [BodyComponent, ContentComponent, TitleBarComponent, BarUserComponent, FooterComponent, MenuComponent, MenuItemComponent],
  exports: [BodyComponent]
})
export class ShellModule { }
