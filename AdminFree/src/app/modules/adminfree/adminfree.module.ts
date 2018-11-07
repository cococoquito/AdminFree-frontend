import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/shared';
import { ShellModule } from '../shell/shell.module';
import { AutenticadoComponent } from './autenticado/autenticado.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AutenticadoComponent,
        children: [
          { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
          { path: 'bienvenida', component: BienvenidaComponent }
        ]
      }
    ]),
    SharedModule,
    ShellModule
  ],
  declarations: [AutenticadoComponent, BienvenidaComponent]
})
export class AdminfreeModule { }
