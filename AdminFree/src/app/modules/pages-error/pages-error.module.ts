import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccesDeniedComponent } from './acces-denied/acces-denied.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterConstant } from '../../constants/router.constant';

/**
 * Modulo que contiene los componentes de la
 * paginas de errores tales como autorizacion o
 * una pagina que no coincide con ningun router
 *
 * @author Carlos Andres Diaz
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NotFoundComponent
      },
      {
        path: RouterConstant.DENEGADO,
        component: AccesDeniedComponent
      }
    ]),
  ],
  declarations: [ AccesDeniedComponent, NotFoundComponent ]
})
export class PagesErrorModule {}
