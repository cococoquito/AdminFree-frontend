import { Injectable } from '@angular/core';
import { LocalStoreState } from './../states/local-store.state';
import { CredencialesDTO } from '../dtos/seguridad/credenciales.dto';
import { UsuarioDTO } from './../dtos/seguridad/usuario.dto';
import { ModuloDTO } from './../dtos/seguridad/modulo.dto';
import { TipoEventoConstant } from './../constants/tipo-evento.constant';
import { RouterConstant } from './../constants/router.constant';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

/**
 * Seguridad para los routers de navegacion de la aplicacion
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * @param router, es el router de la app para el redireccionamiento
   * @param localStoreState, se utiliza para obtener las credenciales del usuario o admin
   */
  constructor(
    private router: Router,
    private localStoreState: LocalStoreState) {}

  /**
   * Metodo que permite validar si el router es valido para el user
   *
   * @param route , es el router actualmente activo
   * @param state , estado en la que se encuentra el router activo
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let valido = true;

    // se obtiene la URL de la pagina destino
    const url = state.url;

    // se obtiene las credenciales del ADMIN o USER
    const credenciales: CredencialesDTO = this.localStoreState.credenciales(TipoEventoConstant.GET);

    // dependiendo del estado de la autenticacion se hace el llamado a los metodos
    if (credenciales) {
        valido = this.canActivateUserLogin(route, credenciales, url);
    } else {
        valido = this.canActivateUserNoLogin(url);
    }
    return valido;
  }

  /**
   * Metodo que permite validar si el current router es valido cuando
   * el usuario se encuentra autenticado en el sistema, tomando sus modulos
   * y verificando si tiene privilegios para esa URL especifica
   *
   * @param route, es el router actualmente activo
   * @param credenciales, son las credenciales del usuario autenticado
   * @param url, es la URL destino que el usuario prentende navegar
   * @returns, true si el usuario tiene privilegios de lo contrario false
   */
  private canActivateUserLogin(route: ActivatedRouteSnapshot, credenciales: CredencialesDTO, url: string): boolean {
    // por default el router es valido
    let valido = true;

    // como el user esta autenticado y la invocacion es pagina LOGIN se redirecciona a HOME
    if (url.includes(RouterConstant.LOGIN)) {
        valido = this.goTo(RouterConstant.BIENVENIDA);
    } else {
      // no aplica para administrador (tiene todo privilegios),
      // tampoco para las paginas de bienvenida y administracion
      // de cuenta user, son visibles para todos los usuarios o admin
      if (!credenciales.administrador &&
          !url.includes(RouterConstant.BIENVENIDA) &&
          !url.includes(RouterConstant.ADMIN_CUENTA_USER)) {

          // se obtiene los datos del usuario autenticado
          const user: UsuarioDTO = this.localStoreState.userAuth(TipoEventoConstant.GET);

          // si el usuario tiene modulos asignados
          if (user && user.modulos) {
              valido = this.tieneUserPrivilegio(user.modulos, route);
          } else {
              valido = this.goTo(RouterConstant.ERROR_DENEGADO);
          }
      }
    }
    return valido;
  }

  /**
   * Metodo que permite validar si el current router es valido cuando
   * el usuario NO se encuentra autenticado en el sistema.
   *
   * @param url, es la URL destino que el usuario prentende navegar
   * @returns, true si la URL es login de lo contrario false
   */
  private canActivateUserNoLogin(url: string): boolean {
    if (!url.includes(RouterConstant.LOGIN)) {
        return this.goTo(RouterConstant.LOGIN);
    }
    return true;
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
    // se recorre todos los modulos asignados al usuario verificando
    // si tiene algun modulo con el mismo token del modulo current
    const tokenModulo: string = route.data.token;
    for (const modulo of modulos) {
      if (modulo.tokenModulo === tokenModulo) {
          return true;
      }
    }
    return this.goTo(RouterConstant.ERROR_DENEGADO);
  }

  /**
   * Metodo que permite ir a un router especifico cuando surge
   * algun error en la seguridad del router
   *
   * @param url , es la URL a navegar
   */
  private goTo(url: string): boolean {
    this.router.navigate(['/' + url]);
    return false;
  }
}
