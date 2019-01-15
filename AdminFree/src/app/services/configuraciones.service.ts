import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UsuarioDTO } from './../dtos/seguridad/usuario.dto';
import { MessageResponseDTO } from './../dtos/transversal/message-response.dto';
import { CambioClaveDTO } from './../dtos/configuraciones/cambio-clave.dto';
import { ClienteDTO } from './../dtos/configuraciones/cliente.dto';
import { CredencialesDTO } from './../dtos/seguridad/credenciales.dto';
import { UsuarioEdicionDTO } from '../dtos/configuraciones/usuario-edicion.dto';
import { NomenclaturaDTO } from './../dtos/configuraciones/nomenclatura.dto';
import { NomenclaturaEdicionDTO } from '../dtos/configuraciones/nomenclatura-edicion.dto';
import { RestriccionDTO } from './../dtos/configuraciones/restriccion.dto';
import { CampoEntradaDTO } from './../dtos/configuraciones/campo-entrada.dto';
import { CampoEntradaEdicionDTO } from '../dtos/configuraciones/campo-entrada-edicion.dto';
import { ConfiguracionesAPIConstant } from './../constants/apis/configuraciones-api.constant';

/**
 * Clase que contiene los servicios del modulo de Correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class ConfiguracionesService {

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
      ConfiguracionesAPIConstant.URL_CREAR_CLIENTE,
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
      ConfiguracionesAPIConstant.URL_ELIMINAR_CLIENTE,
      cliente);
  }

  /**
   * Metodo que permite modificar los datos de un cliente
   *
   * @param cliente a modificar en el sistema
   */
  public modificarCliente(cliente: ClienteDTO): Observable<MessageResponseDTO> {
    return this.http.put<MessageResponseDTO>(
      ConfiguracionesAPIConstant.URL_MODIFICAR_CLIENTE,
      cliente);
  }

  /**
   * Metodo que permite activar/inactivar un cliente
   *
   * @param cliente a activar/inactivar
   */
  public activarInactivarCliente(cliente: ClienteDTO): Observable<ClienteDTO> {
    return this.http.put<ClienteDTO>(
      ConfiguracionesAPIConstant.URL_MODIFICAR_CLIENTE,
      cliente);
  }

  /**
   * Servicio que permite actualizar los datos de la cuenta
	 * del usuario, solamente aplica (Nombre, Usuario Ingreso)
   *
   * @param usuario, DTO 	que contiene los datos del usuario
   * @return OK, si todo el proceso se ejecuto sin errores
   */
  public modificarDatosCuenta(usuario: UsuarioDTO): Observable<MessageResponseDTO> {
    return this.http.put<MessageResponseDTO>(
      ConfiguracionesAPIConstant.URL_MODIFICAR_DATOS_CUENTA,
      usuario
    );
  }

  /**
   * Servicio que permite soportar el proceso de modificar la clave de ingreso
   *
   * @param datos, DTO que contiene los datos para el proceso de la modificacion
   * @return OK, si todo el proceso se ejecuto sin errores
   */
  public modificarClaveIngreso(datos: CambioClaveDTO): Observable<MessageResponseDTO> {
    return this.http.put<MessageResponseDTO>(
      ConfiguracionesAPIConstant.URL_MODIFICAR_CLAVE,
      datos
    );
  }

  /**
   * Servicio que permite consultar los usuarios con estados (ACTIVO/INACTIVO)
   * asociados a un cliente especifico
   *
   * @param cliente, contiene el identificador del cliente
   * @returns lista de Usuarios asociados a un cliente
   */
  public getUsuariosCliente(cliente: ClienteDTO): Observable<Array<UsuarioDTO>> {
    return this.http.post<Array<UsuarioDTO>>(
      ConfiguracionesAPIConstant.URL_GET_CLIENTES_USUARIO,
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
      ConfiguracionesAPIConstant.URL_VALIDAR_DATOS_USER,
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
      ConfiguracionesAPIConstant.URL_CREAR_USUARIO,
      usuario
    );
  }

  /**
	 * Servicio que permite editar los datos de un usuario
	 *
	 * @param datos, DTO que contiene los datos a modificar
	 */
  public editarUsuario(datos: UsuarioEdicionDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ConfiguracionesAPIConstant.URL_EDITAR_USUARIO,
      datos
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
      ConfiguracionesAPIConstant.URL_MODIFICAR_ESTADO_USUARIO,
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
      ConfiguracionesAPIConstant.URL_GENERAR_CLAVE_USUARIO,
      usuario
    );
  }

  /**
	 * Servicio que permite obtener todas las nomenclaturas asociadas a un cliente
	 *
	 * @param idCliente, identificador del cliente quien le pertenece las nomenclaturas
	 * @return lista de nomenclaturas con sus atributos configuradas
	 */
  public getNomenclaturas(idCliente: number): Observable<Array<NomenclaturaDTO>> {
    return this.http.get<Array<NomenclaturaDTO>>(
      ConfiguracionesAPIConstant.URL_GET_NOMENCLATURAS + idCliente
    );
  }

  /**
	 * Servicio que permite crear una nomenclatura
	 *
	 * @param nomenclatura, contiene los datos de la creacion
	 * @return Nomenclatura con el identificador generado
	 */
  public crearNomenclatura(datos: NomenclaturaDTO): Observable<NomenclaturaDTO> {
    return this.http.post<NomenclaturaDTO>(
      ConfiguracionesAPIConstant.URL_CREAR_NOMENCLATURA,
      datos
    );
  }

  /**
	 * Servicio que permite editar la nomenclatura
	 *
	 * @param datos, contiene los datos de la edicion
	 */
  public editarNomenclatura(datos: NomenclaturaEdicionDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ConfiguracionesAPIConstant.URL_EDITAR_NOMENCLATURA,
      datos
    );
  }

  /**
	 * Servicio que permite validar si la nomenclatura ya existe en el sistema
	 *
	 * @param nomenclatura, DTO que contiene los datos para la validacion
	 */
  public validarExisteNomenclatura(nomenclatura: NomenclaturaDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ConfiguracionesAPIConstant.URL_VALIDAR_EXISTE_NOMENCLATURA,
      nomenclatura
    );
  }

  /**
	 * Servicio que permite eliminar una nomenclatura del sistema
	 *
	 * @param idNomenclatura, identificador de la nomenclatura
	 */
  public eliminarNomenclatura(idNomenclatura: number): Observable<MessageResponseDTO> {
    return this.http.delete<MessageResponseDTO>(
      ConfiguracionesAPIConstant.URL_ELIMINAR_NOMENCLATURA + idNomenclatura);
  }

  /**
	 * Servicio que permite consultar el detalle de la nomenclatura
	 *
	 * @param idNomenclatura, identificador de la nomenclatura
	 */
  public getDetalleNomenclatura(idNomenclatura: number): Observable<NomenclaturaDTO> {
    return this.http.get<NomenclaturaDTO>(
      ConfiguracionesAPIConstant.URL_GET_DETALLE_NOMENCLATURA + idNomenclatura
    );
  }

  /**
   * Metodo que permite soportar el proceso de negocio para
	 * la creacion del campo de entrada de informacion
   *
   * @param campoEntrada , DTO que contiene los datos del nuevo campo de entrada
   * @returns DTO con los datos del nuevo campo de entrada
   */
  public crearCampoEntrada(campoEntrada: CampoEntradaDTO): Observable<CampoEntradaDTO> {
    return this.http.post<CampoEntradaDTO>(
      ConfiguracionesAPIConstant.URL_CREAR_CAMPO_ENTRADA,
      campoEntrada
    );
  }

  /**
	 * Metodo que permite obtener los campos de entrada de informacion asociado a un cliente
	 *
	 * @param idCliente, identificador del cliente que le pertenece los campos de entrada
	 * @return lista DTO con la informacion de los campos de entrada
	 */
  public getCamposEntrada(idCliente: number): Observable<Array<CampoEntradaDTO>> {
    return this.http.get<Array<CampoEntradaDTO>>(
      ConfiguracionesAPIConstant.URL_GET_CAMPOS_ENTRADA + idCliente
    );
  }

  /**
	 * Metodo que permite obtener el detalle de un campo de entrada de informacion
	 *
	 * @param idCampo, identificador del campo de entrada informacion
	 * @return DTO con los datos del campo de entrada de informacion
	 */
  public getDetalleCampoEntrada(idCampo: number): Observable<CampoEntradaDTO> {
    return this.http.get<CampoEntradaDTO>(
      ConfiguracionesAPIConstant.URL_GET_DETALLE_CAMPO_ENTRADA + idCampo
    );
  }

  /**
	 * Metodo que soporta el proceso de negocio para la eliminacion de un campo de entrada
	 *
	 * @param idCampo, identificador del campo de entrada
	 */
  public eliminarCampoEntrada(idCampo: number): Observable<MessageResponseDTO> {
    return this.http.delete<MessageResponseDTO>(
      ConfiguracionesAPIConstant.URL_DELETE_CAMPO_ENTRADA + idCampo
    );
  }

  /**
	 * Metodo que permite obtener el detalle de un campo de entrada para edicion
	 *
	 * @param idCampo, identificador del campo de entrada a editar
	 * @return DTO con los datos del campo de entrada de informacion a editar
	 */
  public getDetalleCampoEntradaEdicion(idCampo: number): Observable<CampoEntradaEdicionDTO> {
    return this.http.get<CampoEntradaEdicionDTO>(
      ConfiguracionesAPIConstant.URL_GET_DETALLE_CAMPO_EDITAR + idCampo
    );
  }

  /**
	 * Metodo que permite editar un campo de entrada de informacion
	 *
	 * @param datosEditar, DTO que contiene los datos a editar
	 * @return DTO con los datos basico del campo
	 */
  public editarCampoEntradaInformacion(datosEditar: CampoEntradaEdicionDTO): Observable<CampoEntradaDTO> {
    return this.http.put<CampoEntradaDTO>(
      ConfiguracionesAPIConstant.URL_EDITAR_CAMPO_ENTRADA,
      datosEditar
    );
  }

  /**
	 * Servicio que permite validar los datos de campo de entrada
	 * esto aplica para el primer paso al momento de crear o editar el campo
	 *
	 * @param datosCampo, contiene los datos del campo de entrada
	 * @return lista restricciones asociada al tipo de campo
	 */
  public validarDatosCampoEntrada(datosCampo: CampoEntradaDTO): Observable<Array<RestriccionDTO>> {
    return this.http.post<Array<RestriccionDTO>>(
      ConfiguracionesAPIConstant.URL_VALIDAR_DATOS_ENTRADA,
      datosCampo
    );
  }
}