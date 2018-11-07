import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/shared';
import { ShellModule } from '../shell/shell.module';
import { AutenticadoComponent } from './autenticado/autenticado.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { RouterConstant } from './../../constants/router.constant';

/**
 * Modulo donde contiene solamente los componente del negocio tales como,
 * correspondencia, archivo gestion, configuraciones, reportes etc
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AutenticadoComponent,
        children: [
          { path: '', redirectTo: RouterConstant.BIENVENIDA, pathMatch: 'full' },
          { path: RouterConstant.BIENVENIDA, component: BienvenidaComponent }
        ]
      }
    ]),
    SharedModule,
    ShellModule
  ],
  declarations: [AutenticadoComponent, BienvenidaComponent]
})
export class AdminfreeModule { }
