import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ClienteDTO } from './../dtos/configuraciones/cliente.dto';
import { MessageResponseDTO } from './../dtos/transversal/message-response.dto';
import { ConfiguracionesConstant } from './../constants/configuraciones.constant';

/**
 * Clase que contiene todos los servicios para la administracion
 * de los clientes en el sistema
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class AdminClienteService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}

  /**
   * Metodo que permite crear un cliente en el sistema
   *
   * @param nuevoCliente, DTO con los datos del cliente a crear
   * @returns DTO con los datos del cliente creado
   */
  public crearCliente(nuevoCliente: ClienteDTO): Observable<ClienteDTO> {
    return this.http.post<ClienteDTO>(
      ConfiguracionesConstant.URL_CREAR_CLIENTE,
      nuevoCliente
    );
  }

  /**
   * Metodo que permite eliminar un cliente del sistema
   *
   * @param cliente a eliminar
   * @returns Estatus del response donde se identifica si el proceso
   * se ejecuto con exito o se genero algun error
   */
  public eliminarCliente(cliente: ClienteDTO): Observable<MessageResponseDTO> {
    return this.http.put<MessageResponseDTO>(
      ConfiguracionesConstant.URL_ELIMINAR_CLIENTE,
      cliente);
  }

  /**
   * Metodo que permite modificar los datos de un cliente
   *
   * @param cliente a modificar en el sistema
   */
  public modificarCliente(cliente: ClienteDTO): Observable<MessageResponseDTO> {
    return this.http.put<MessageResponseDTO>(
      ConfiguracionesConstant.URL_MODIFICAR_CLIENTE,
      cliente);
  }

  /**
   * Metodo que permite activar/inactivar un cliente
   *
   * @param cliente a activar/inactivar
   */
  public activarInactivarCliente(cliente: ClienteDTO): Observable<ClienteDTO> {
    return this.http.put<ClienteDTO>(
      ConfiguracionesConstant.URL_MODIFICAR_CLIENTE,
      cliente);
  }
}
