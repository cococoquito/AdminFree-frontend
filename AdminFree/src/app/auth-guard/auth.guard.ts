import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

/**
 * Guardia del router que permite validar si el usuario
 * tiene privilegios para un determinada pagina
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * Metodo que permite validar si el router es valido para el user
   * @param route , es el router actualmente activo
   * @param state , estado en la que se encuentra el router activo
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard ActivatedRouteSnapshot...' + route.url);
    console.log('AuthGuard RouterStateSnapshot...' + state.url);
    return true;
  }
}
