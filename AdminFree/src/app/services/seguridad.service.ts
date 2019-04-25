import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SeguridadAPIConstant } from './../constants/apis/seguridad-api.constant';
import { AdminClientesDTO } from './../dtos/configuraciones/admin-clientes.dto';
import { CredencialesDTO } from './../dtos/seguridad/credenciales.dto';
import { WelcomeDTO } from './../dtos/seguridad/welcome.dto';

/**
 * Clase que contiene los servicios del modulo de seguridad del sistema
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class SeguridadService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}

  /**
   * Metodo que permite soportar el proceso de iniciar sesion para Admin Clientes
   *
   * @param credenciales, contiene las credenciales del usuario
   * @returns DTO con los datos de inicio para el modulo de admin clientes
   */
  public iniciarSesionAdminClientes(credenciales: CredencialesDTO): Observable<AdminClientesDTO> {
    return this.http.post<AdminClientesDTO>(
      SeguridadAPIConstant.URL_ADMIN_CLIENTES_AUTH,
      credenciales
    );
  }

  /**
   * Servicio que permite soportar el proceso de iniciar sesion
   *
   * @param credenciales, contiene las credenciales del USER o ADMIN
   * @return datos de inicio de la aplicacion
   */
  public iniciarSesion(credenciales: CredencialesDTO): Observable<WelcomeDTO> {
    return this.http.post<WelcomeDTO>(
      SeguridadAPIConstant.URL_AUTH,
      credenciales
    );
  }
}
