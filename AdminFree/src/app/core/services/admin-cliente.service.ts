import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ClienteDTO } from './../../model/configuraciones/cliente.dto';
import { AutenticacionDTO } from './../../model/configuraciones/autenticacion.dto';
import { AdminClientesDTO } from './../../model/configuraciones/admin-clientes.dto';
import { MessageResponse } from './../../model/common/message-response';
import { ModuloConfiguracionesURL, ModuloSeguridadURL } from './../../enums/app-enums';

/**
 * Servicio que contiene todos los metodos para
 * la administracion de los clientes
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class AdminClienteService {

  /**
   * Creates an instance of AdminClienteService
   *
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}

  /**
   * Servicio que permite soportar el proceso de iniciar sesion de Admin Clientes
   */
  public iniciarSesion(credenciales: AutenticacionDTO): Observable<AdminClientesDTO> {
    return this.http.post<AdminClientesDTO>(
      ModuloSeguridadURL.ADMIN_CLIENTES_AUTH.toString(),
      credenciales
    );
  }

  /**
   * Servicio que permite obtener los CLIENTES del sistema
   */
  public getClientes(): Observable<ClienteDTO[]> {
    return this.http.get<ClienteDTO[]>(ModuloConfiguracionesURL.CLIENTES.toString());
  }

  /**
   * Servicio que permite crear un cliente en el sistema
   */
  public crearCliente(nuevoCliente: ClienteDTO): Observable<ClienteDTO> {
    return this.http.post<ClienteDTO>(
      ModuloConfiguracionesURL.CREAR_CLIENTES.toString(),
      nuevoCliente
    );
  }

  /**
   * Servicio que permite eliminar un cliente del sistema
   */
  public eliminarCliente(cliente: ClienteDTO): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(
      ModuloConfiguracionesURL.ELIMINAR_CLIENTE.toString(),
      cliente);
  }

  /**
   * Servicio que permite modificar los datos de un cliente
   */
  public modificarCliente(cliente: ClienteDTO): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(
      ModuloConfiguracionesURL.MODIFICAR_CLIENTE.toString(),
      cliente);
  }
}
