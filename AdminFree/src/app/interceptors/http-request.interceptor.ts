import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { CredencialesDTO } from '../dtos/seguridad/credenciales.dto';
import { KeyLocalStoreConstant } from './../constants/key-localstore.constant';
import { SeguridadConstant } from '../constants/seguridad.constant';
import { AppSecurityConstant } from '../constants/app-security.constant';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

/**
 * Interceptor que permite configurar la seguridad y el spinner para
 * cada peticion HTTP que realiza el usuario
 *
 * @author Carlos Andres Diaz
 */
export class HttpRequestInterceptor implements HttpInterceptor {

  /**
   * Metodo que permite capturar cada request del sistema,
   * para asi agregar la seguridad correspondiente a cada peticion
   * con su respectivo spinner
   *
   * @param req, es la solicitud que envia el cliente
   * @param next, es el siguiente interceptor a ejecutar, si aplica
   * @returns Observador con el request modificado
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // variable que contiene los valores del header dependiendo la URL
    let security;

    // si la peticion es para autenticacion se agrega la seguridad correspondiente
    if (SeguridadConstant.URL_AUTH === req.url ||
        SeguridadConstant.URL_ADMIN_CLIENTES_AUTH === req.url) {
          security = this.getHeaderSecurity(
            AppSecurityConstant.AUTH_USER,
            AppSecurityConstant.AUTH_PASS,
            AppSecurityConstant.AUTH_TOKEN + AppSecurityConstant.POST_ANGULAR_AUTH
          );
    } else {
      // peticiones que no sea de autenticacion se verifica con las credenciales del usuario
      const credenciales: CredencialesDTO = JSON.parse(
        localStorage.getItem(KeyLocalStoreConstant.KEY_USER_SECURITY)
      );
      security = this.getHeaderSecurity(
        credenciales.usuario,
        credenciales.clave,
        credenciales.token + AppSecurityConstant.POST_ANGULAR
      );
    }

    // se configura el spinner para esta peticion
    console.log('inicio request...');
    return next.handle(req.clone({ setHeaders: security })).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('finalizo request...');
          }
        },
        (err: any) => {
          console.log('finalizo request...');
        }
      )
    );
  }

  /**
   * Metodo que permite crear un Header con seguridad
   * @param user , usuario a configurar en el header
   * @param pass , clave a configurar en el header
   * @param token , token a configurar en el header
   */
  private getHeaderSecurity(user: string, pass: string, token: string): any {
    return {
      'Content-Type': AppSecurityConstant.CONTENT,
      'huser': user,
      'hpass': pass,
      'htoken': token
    };
  }
}
