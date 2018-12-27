import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ClienteDTO } from './../dtos/configuraciones/cliente.dto';
import { UsuarioDTO } from './../dtos/seguridad/usuario.dto';
import { CredencialesDTO } from './../dtos/seguridad/credenciales.dto';
import { MessageResponseDTO } from './../dtos/transversal/message-response.dto';
import { ConfiguracionesConstant } from './../constants/configuraciones.constant';

/**
 * Clase que contiene todos los servicios para la administracion
 * de los Usuarios en el sistema
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class AdminUsuarioService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}

  /**
   * Servicio que permite consultar los usuarios con estados (ACTIVO/INACTIVO)
   * asociados a un cliente especifico
   *
   * @param cliente, contiene el identificador del cliente
   * @returns lista de Usuarios asociados a un cliente
   */
  public getUsuariosCliente(cliente: ClienteDTO): Observable<Array<UsuarioDTO>> {
    return this.http.post<Array<UsuarioDTO>>(
      ConfiguracionesConstant.URL_GET_CLIENTES_USUARIO,
      cliente
    );
  }

  /**
	 * Servicio que permite validar los datos del usuario para la creacion o modificacion
	 *
	 * @param usuario, DTO con los datos del usuario a crear o modificar
	 */
  public validarDatosUsuario(usuario: UsuarioDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ConfiguracionesConstant.URL_VALIDAR_DATOS_USER,
      usuario
    );
  }

  /**
   * Servicio que permite crear el usuario con sus privilegios en el sistema
   *
   * @param usuario, DTO que contiene los datos del usuarios
   * @returns DTO con los datos del usuario creado
   */
  public crearUsuario(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(
      ConfiguracionesConstant.URL_CREAR_USUARIO,
      usuario
    );
  }

  /**
   * Servicio que permite cambiar el estado de un usuario
   *
   * @param usuario, DTO que contiene los datos del usuario a modificar
   * @returns OK, si todo el proceso se ejecuto sin errores
   */
  public modificarEstadoUsuario(usuario: UsuarioDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ConfiguracionesConstant.URL_MODIFICAR_ESTADO_USUARIO,
      usuario
    );
  }

  /**
   * Servicio que permite modificar los privilegios de un Usuario
   *
   * @param usuario, DTO que contiene el identificador y los privilegios a modificar
   * @returns OK, si todo el proceso se ejecuto sin errores
   */
  public modificarPrivilegiosUsuario(usuario: UsuarioDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ConfiguracionesConstant.URL_MODIFICAR_PRIVILEGIOS_USUARIO,
      usuario
    );
  }

  /**
   * Servicio que permite generar una nueva clave
	 * de ingreso para el usuario que llega por parametro
   *
   * @param usuario, DTO con el identificador del usuario
   * @returns DTO con la clave de ingreso generada
   */
  public generarClaveIngreso(usuario: UsuarioDTO): Observable<CredencialesDTO> {
    return this.http.post<CredencialesDTO>(
      ConfiguracionesConstant.URL_GENERAR_CLAVE_USUARIO,
      usuario
    );
  }
}
