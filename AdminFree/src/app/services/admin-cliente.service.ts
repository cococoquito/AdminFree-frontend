import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ClienteDTO } from './../dtos/configuraciones/cliente.dto';
import { AutenticacionDTO } from './../dtos/configuraciones/autenticacion.dto';
import { AdminClientesDTO } from './../dtos/configuraciones/admin-clientes.dto';
import { MessageResponseDTO } from './../dtos/transversal/message-response.dto';
import { ConfiguracionesConstant } from './../constants/configuraciones.constant';
import { SeguridadConstant } from './../constants/seguridad.constant';

/**
 * Servicio que contiene todos los metodos para la administracion de los clientes
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
   * Metodo que permite soportar el proceso de iniciar sesion de Admin Clientes
   *
   * @param credenciales, contiene las credenciales del usuario
   * @returns DTO con los datos de inicio para el modulo de admin clientes
   */
  public iniciarSesion(credenciales: AutenticacionDTO): Observable<AdminClientesDTO> {
    return this.http.post<AdminClientesDTO>(
      SeguridadConstant.URL_ADMIN_CLIENTES_AUTH,
      credenciales
    );
  }

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
   * Metodo que permite modificar los dato de un cliente
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
