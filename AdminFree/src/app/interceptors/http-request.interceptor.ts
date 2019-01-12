import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { SpinnerState } from './../states/spinner.state';
import { CredencialesDTO } from '../dtos/seguridad/credenciales.dto';
import { SeguridadAPIConstant } from '../constants/apis/seguridad-api.constant';
import { AppSecurityConstant } from '../constants/app-security.constant';
import { LocalStoreUtil } from '../util/local-store.util';
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
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  /**
   * @param spinnerState, se utiliza para visualizar, ocultar el spinner
   */
  constructor(private spinnerState: SpinnerState) {}

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

    // variable que contiene el header con seguridad
    let securityHeader;

    // si la peticion es para autenticacion se agrega la seguridad correspondiente
    if (SeguridadAPIConstant.URL_AUTH === req.url ||
        SeguridadAPIConstant.URL_ADMIN_CLIENTES_AUTH === req.url) {
          securityHeader = this.getSecurityHeader(
            AppSecurityConstant.AUTH_USER,
            AppSecurityConstant.AUTH_PASS,
            AppSecurityConstant.AUTH_TOKEN + AppSecurityConstant.POST_ANGULAR_AUTH
          );
    } else {
      // peticiones que no sea de autenticacion se verifica con las credenciales del usuario
      const credenciales: CredencialesDTO = LocalStoreUtil.getCurrentCredenciales();
      if (credenciales) {
        securityHeader = this.getSecurityHeader(
          credenciales.usuario,
          credenciales.clave,
          credenciales.token + AppSecurityConstant.POST_ANGULAR
        );
      }
    }

    // se configura el spinner para esta peticion
    this.spinnerState.displaySpinner();
    return next.handle(req.clone({ setHeaders: securityHeader })).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerState.hideSpinner();
          }
        },
        (err: any) => {
          this.spinnerState.hideSpinner();
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
  private getSecurityHeader(user: string, pass: string, token: string): any {
    return {
      'Content-Type': AppSecurityConstant.CONTENT,
      'huser': user,
      'hpass': pass,
      'htoken': token
    };
  }
}
