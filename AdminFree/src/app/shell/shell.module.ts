import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { ContentComponent } from './content/content.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { BarUserComponent } from './bar-user/bar-user.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BodyComponent, ContentComponent, TitleBarComponent, BarUserComponent, FooterComponent],
  exports: [BodyComponent]
})
export class ShellModule { }
