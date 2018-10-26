import { Observable } from 'rxjs/Observable';
import { AutenticacionDTO } from './../model/configuraciones/autenticacion.dto';
import {
  AppSecurity,
  ModuloSeguridadURL,
  keyLocalStore
} from './../enums/app-enums';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

/**
 * Interceptor que permite configurar la seguridad para las peticiones HTTP
 *
 * @author Carlos Andres Diaz
 */
export class HttpRequestInterceptor implements HttpInterceptor {

  /**
   * Metodo que permite capturar cada request del sistema,
   * para asi agregar la seguridad correspondiente a cada peticion
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Nombres de las URL
    const adminClienteURL: string = ModuloSeguridadURL.ADMIN_CLIENTES_AUTH.toString();

    // variable que contiene los valores del header dependiendo la URL
    let security;

    // si la peticion es para la autenticacion de admin-clientes
    if (req.url === adminClienteURL) {
      security = {
        'Content-Type': AppSecurity.content,
        'huser': AppSecurity.auth_user,
        'hpass': AppSecurity.auth_pass,
        'htoken': AppSecurity.auth_token + AppSecurity.post_angular_auth
      };
    } else {
      const credenciales: AutenticacionDTO = JSON.parse(
        localStorage.getItem(keyLocalStore.KEY_USER_SECURITY)
      );
      security = {
        'Content-Type': AppSecurity.content,
        'huser': credenciales.usuario,
        'hpass': credenciales.clave,
        'htoken': credenciales.token + AppSecurity.post_angular
      };
    }

    // se configura el header para el sieguiente filtro
    return next.handle(req.clone({ setHeaders: security }));
  }
}
