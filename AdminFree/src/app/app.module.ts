import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootRoutingModule } from './core/root/root-routing-module';

import { RootComponent } from './core/root/root.component';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    RootRoutingModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
