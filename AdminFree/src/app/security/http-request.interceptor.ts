import { Observable } from 'rxjs/Observable';
import { AutenticacionDTO } from './../dtos/seguridad/autenticacion.dto';
import { KeyLocalStoreConstant } from './../constants/key-localstore.constant';
import { SeguridadConstant } from '../constants/seguridad.constant';
import { AppSecurityConstant } from '../constants/app-security.constant';
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
   *
   * @param req, es la solicitud que envia el cliente
   * @param next, es el siguiente interceptor a ejecutar, si aplica
   * @returns Observador con el request modificado
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // variable que contiene los valores del header dependiendo la URL
    let security;

    // si la peticion es para la autenticacion de admin-clientes
    if (SeguridadConstant.URL_ADMIN_CLIENTES_AUTH === req.url) {
      security = {
        'Content-Type': AppSecurityConstant.CONTENT,
        'huser': AppSecurityConstant.AUTH_USER,
        'hpass': AppSecurityConstant.AUTH_PASS,
        'htoken': AppSecurityConstant.AUTH_TOKEN + AppSecurityConstant.POST_ANGULAR_AUTH
      };
    } else {
      // peticiones que no sea de autenticacion se verifica con las credenciales del usuario
      const credenciales: AutenticacionDTO = JSON.parse(
        localStorage.getItem(KeyLocalStoreConstant.KEY_USER_SECURITY)
      );
      security = {
        'Content-Type': AppSecurityConstant.CONTENT,
        'huser': credenciales.usuario,
        'hpass': credenciales.clave,
        'htoken': credenciales.token + AppSecurityConstant.POST_ANGULAR
      };
    }

    // se configura el header para el siguiente filtro
    return next.handle(req.clone({ setHeaders: security }));
  }
}
