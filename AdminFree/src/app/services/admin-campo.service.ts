import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RestriccionDTO } from './../dtos/configuraciones/restriccion.dto';
import { MessageResponseDTO } from '../dtos/transversal/message-response.dto';
import { CampoEntradaDTO } from './../dtos/configuraciones/campo-entrada.dto';
import { CampoEntradaEdicionDTO } from '../dtos/configuraciones/campo-entrada-edicion.dto';
import { ConfiguracionesConstant } from './../constants/configuraciones.constant';

/**
 * Clase que contiene todos los servicios para la administracion
 * de los campos de entrada de informacion para solicitar un consecutivo
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class AdminCampoService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}

  /**
   * Metodo que permite obtener las restricciones asociadas a un tipo campo
   *
   * @param tipoCampo , id del tipo de campo
   * @returns lista de DTO con los datos de las restricciones
   */
  public getRestriciones(tipoCampo: number): Observable<Array<RestriccionDTO>> {
    return this.http.get<Array<RestriccionDTO>>(
      ConfiguracionesConstant.URL_GET_RESTRICCIONES + tipoCampo
    );
  }

  /**
   * Metodo que permite validar si el campo de entrada existe para el tipo, nombre y cliente
   *
   * @param campoEntrada , DTO que contiene los datos del nuevo campo de entrada
   */
  public validarCampoEntradaExistente(campoEntrada: CampoEntradaDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ConfiguracionesConstant.URL_VALIDAR_CAMPO_ENTRADA,
      campoEntrada
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
      ConfiguracionesConstant.URL_CREAR_CAMPO_ENTRADA,
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
      ConfiguracionesConstant.URL_GET_CAMPOS_ENTRADA + idCliente
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
      ConfiguracionesConstant.URL_GET_DETALLE_CAMPO_ENTRADA + idCampo
    );
  }

  /**
	 * Metodo que soporta el proceso de negocio para la eliminacion de un campo de entrada
	 *
	 * @param idCampo, identificador del campo de entrada
	 */
  public eliminarCampoEntrada(idCampo: number): Observable<MessageResponseDTO> {
    return this.http.delete<MessageResponseDTO>(
      ConfiguracionesConstant.URL_DELETE_CAMPO_ENTRADA + idCampo
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
      ConfiguracionesConstant.URL_GET_DETALLE_CAMPO_EDITAR + idCampo
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
      ConfiguracionesConstant.URL_EDITAR_CAMPO_ENTRADA,
      datosEditar
    );
  }
}
