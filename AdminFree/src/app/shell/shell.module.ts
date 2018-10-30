import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { ContentComponent } from './content/content.component';
import { TitleBarComponent } from './title-bar/title-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BodyComponent, ContentComponent, TitleBarComponent],
  exports: [BodyComponent]
})
export class ShellModule { }
