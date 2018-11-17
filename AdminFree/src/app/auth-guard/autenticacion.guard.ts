import { Injectable } from '@angular/core';
import { WelcomeDTO } from './../dtos/seguridad/welcome.dto';
import { RouterConstant } from './../constants/router.constant';
import { TipoEventoConstant } from './../constants/tipo-evento.constant';
import { LocalStoreUtil } from './../util-class/local-store.util';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

/**
 * Se utiliza para los routers principales, donde se requiere
 * estar autenticado para poder acceder a los Modulos del negocio
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class AutenticacionGuard implements CanActivate {

  /**
   * @param router, se utiliza para el redireccionamiento si
   * surge algun error en el filtro
   */
  constructor(private router: Router) {}

  /**
   * Metodo que permite validar si el usuario ya se encuentra autenticado
   * para los routers que esten senialado para este filtro
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let valido = true;

    // se obtiene la URL de la pagina destino
    const url = state.url;

    // DTO que contiene los datos de inicio sesion
    const welcome: WelcomeDTO = LocalStoreUtil.welcome(TipoEventoConstant.GET);

    // dependiendo del estado de la autenticacion se hace el llamado a los metodos
    if (welcome && welcome.credenciales) {
        valido = this.canActivateUserLogin(url);
    } else {
        valido = this.canActivateUserNoLogin(url);
    }
    return valido;
  }

  /**
   * Cuando el usuario esta autenticado la URL NO puede ser
   * LOGIN, si la URL es LOGIN se redirecciona a la pagina
   * de bienvenida.
   */
  private canActivateUserLogin(url: string): boolean {
    if (url.includes(RouterConstant.ROUTER_LOGIN)) {
      return this.goTo(RouterConstant.NAVIGATE_BIENVENIDA);
    }
    return true;
  }

  /**
   * Cuando el usuario NO esta autenticado la URL debe ser
   * LOGIN, si la URL no es LOGIN se redirecciona a la pagina
   * de INICIO DE SESION.
   */
  private canActivateUserNoLogin(url: string): boolean {
    if (!url.includes(RouterConstant.ROUTER_LOGIN)) {
      return this.goTo(RouterConstant.NAVIGATE_LOGIN);
    }
    return true;
  }

  /**
   * Metodo que permite ir a un router especifico cuando surge
   * algun error en la seguridad del router
   */
  private goTo(url: string): boolean {
    this.router.navigate([url]);
    return false;
  }
}
