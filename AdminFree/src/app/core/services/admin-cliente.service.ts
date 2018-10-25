import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ClienteDTO } from './../../model/configuraciones/cliente.dto';
import { AutenticacionDTO } from './../../model/configuraciones/autenticacion.dto';
import { ApiConfiguracionesEnum, ApiSeguridadEnum, AppEnum } from './../../enums/app-enums';

/**
 * Clase que contiene todos los servicios para
 * la administracion de los clientes
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class AdminClienteService {

  /** Se necesita para las peticiones PUT y POST*/
  private headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });

  /**
   * Creates an instance of AdminClienteService
   *
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}

  /**
   * Servicio que permite soportar el proceso de iniciar sesion de Admin Clientes
   */
  public iniciarSesion(credenciales: AutenticacionDTO): Observable<AutenticacionDTO> {
    return this.http.post<AutenticacionDTO>(
      AppEnum.DOMINIO_REST +
      ApiSeguridadEnum.SEGURIDAD_API +
      ApiSeguridadEnum.ADMIN_CLIENTES_ENTRAR,
      credenciales, { headers: this.headers }
    );
  }

  /**
   * Servicio que permite obtener los CLIENTES del sistema
   */
  public getClientes(): Observable<ClienteDTO[]> {
    return this.http.get<ClienteDTO[]>(
      AppEnum.DOMINIO_REST +
      ApiConfiguracionesEnum.CONFIGURACIONES_API +
      ApiConfiguracionesEnum.CLIENTES
    );
  }
}
