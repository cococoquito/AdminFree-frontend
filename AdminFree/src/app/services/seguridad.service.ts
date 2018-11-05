import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AdminClientesDTO } from './../dtos/configuraciones/admin-clientes.dto';
import { CredencialesDTO } from './../dtos/seguridad/credenciales.dto';
import { UsuarioDTO } from './../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../dtos/configuraciones/cliente.dto';
import { SeguridadConstant } from './../constants/seguridad.constant';

/**
 * Clase que contiene todos los servicios para el modulo de SEGURIDAD
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
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
      SeguridadConstant.URL_ADMIN_CLIENTES_AUTH,
      credenciales
    );
  }

  /**
   * Servicio que permite soportar el proceso de iniciar sesion
   *
   * @param credenciales, contiene las credenciales del USER o ADMIN
   */
  public iniciarSesion(credenciales: CredencialesDTO): Observable<ClienteDTO | UsuarioDTO> {
    return this.http.post<ClienteDTO | UsuarioDTO>(
      SeguridadConstant.URL_AUTH,
      credenciales
    );
  }
}
