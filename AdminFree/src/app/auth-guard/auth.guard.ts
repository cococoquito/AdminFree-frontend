import { UsuarioDTO } from './../dtos/seguridad/usuario.dto';
import { Injectable } from '@angular/core';
import { LocalStoreState } from './../states/local-store.state';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { CredencialesDTO } from '../dtos/seguridad/credenciales.dto';
import { TipoEventoConstant } from './../constants/tipo-evento.constant';
import { RouterConstant } from './../constants/router.constant';

/**
 * Guardia del router que permite validar si el usuario
 * tiene privilegios para un determinada pagina
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * Constructor del Guardian del routing
   * @param router, es el router de la app para el redireccionamiento
   * @param localStoreState, se utiliza para obtener las credenciales del usuario o admin
   */
  constructor(
    private router: Router,
    private localStoreState: LocalStoreState) {}

  /**
   * Metodo que permite validar si el router es valido para el user
   * @param route , es el router actualmente activo
   * @param state , estado en la que se encuentra el router activo
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const esValido = true;
    const idRouter: number = route.data.id;
    console.log(idRouter);
    return esValido;
  }
}
