import { Injectable } from '@angular/core';
import { WelcomeDTO } from './../dtos/seguridad/welcome.dto';
import { ModuloDTO } from './../dtos/seguridad/modulo.dto';
import { RouterConstant } from './../constants/router.constant';
import { TipoEventoConstant } from './../constants/tipo-evento.constant';
import { LocalStoreUtil } from './../util/local-store.util';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';

/**
 * Se utiliza para los routers secundarios, donde se requiere
 * que el usuario tenga privilegios para acceder a estos modulos
 * del negocio.
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class PrivilegiosGuard implements CanActivate {

  /**
   * @param router, se utiliza para el redireccionamiento si
   * surge algun error en el filtro
   */
  constructor(private router: Router) {}

  /**
   * Metodo que permite validar si el usuario tiene privilegios
   * para acceder al modulo que pretende ingresar
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let valido = true;

    // DTO que contiene los datos de inicio sesion
    const welcome: WelcomeDTO = LocalStoreUtil.welcome(TipoEventoConstant.GET);

    // validacion defensiva, el user debe estar autenticado
    if (welcome && welcome.credenciales) {

      // no aplica para administrador (tiene todo privilegios)
      if (!welcome.credenciales.administrador) {

        // se obtiene los modulos del usuario autenticado
        const modulos: Array<ModuloDTO> = welcome.usuario.modulos;

        // si el usuario tiene modulos asignados
        if (modulos) {
            valido = this.tieneUserPrivilegio(modulos, route);
        } else {
            valido = this.goTo(RouterConstant.NAVIGATE_DENEGADO);
        }
      }
    } else {
      valido = this.goTo(RouterConstant.NAVIGATE_DENEGADO);
    }
    return valido;
  }

  /**
   * Metodo que permite validar si los modulos asignados al usuario
   * tiene visibilidad al current router navegacion
   *
   * @param modulos asignados al user
   * @param route se utiliza para obtener el token del modulo current
   * @returns true si tiene privilegios de lo contrario false
   */
  private tieneUserPrivilegio(modulos: Array<ModuloDTO>, route: ActivatedRouteSnapshot): boolean {
    const tokenModulo: string = route.data.token;
    for (const modulo of modulos) {
      if (modulo.tokenModulo === tokenModulo) {
        return true;
      }
    }
    return this.goTo(RouterConstant.NAVIGATE_DENEGADO);
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
