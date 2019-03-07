import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { InitSolicitarConsecutivoDTO } from './../dtos/correspondencia/init-solicitar-consecutivo.dto';
import { CampoEntradaDetalleDTO } from './../dtos/correspondencia/campo-entrada-detalle.dto';
import { SolicitudConsecutivoDTO } from './../dtos/correspondencia/solicitud-consecutivo.dto';
import { MessageResponseDTO } from './../dtos/transversal/message-response.dto';
import { SolicitudConsecutivoResponseDTO } from '../dtos/correspondencia/solicitud-consecutivo-response.dto';
import { WelcomeInitDTO } from '../dtos/correspondencia/welcome-init.dto';
import { DocumentoDTO } from '../dtos/correspondencia/documento.dto';
import { CorrespondenciaAPIConstant } from './../constants/apis/correspondencia-api.constant';
import { FiltroConsecutivosAnioActualDTO } from '../dtos/correspondencia/filtro-consecutivos-anio-actual.dto';
import { InitConsecutivosAnioActualDTO } from './../dtos/correspondencia/init-consecutivos-anio-actual.dto';
import { PaginadorResponseDTO } from '../dtos/transversal/paginador-response.dto';
import { ConsecutivoDetalleDTO } from '../dtos/correspondencia/consecutivo-detalle.dto';

/**
 * Clase que contiene los servicios del modulo de Correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class CorrespondenciaService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) {}

  /**
   * Servicio que permite obtener los campos de la nomenclatura
   *
   * @param idNomenclatura, identificador de la nomenclatura
   * @return DTO con los campos de la nomenclatura
   */
  public getCamposNomenclatura(idNomenclatura: number): Observable<Array<CampoEntradaDetalleDTO>> {
    return this.http.get<Array<CampoEntradaDetalleDTO>>(
      CorrespondenciaAPIConstant.URL_GET_DTL_NOMENCLATURA_CAMPOS + idNomenclatura
    );
  }

  /**
	 * Servicio que permite obtener los datos iniciales para las
	 * solicitudes de consecutivos de correspondencia
	 *
	 * @param idCliente, identificador del cliente autenticado
	 * @return DTO con los datos iniciales
	 */
  public getInitSolicitarConsecutivo(idCliente: number): Observable<InitSolicitarConsecutivoDTO> {
    return this.http.get<InitSolicitarConsecutivoDTO>(
      CorrespondenciaAPIConstant.URL_INIT_CORRESPONDENCIA + idCliente
    );
  }

  /**
	 * Servicio que permite validar los campos de ingreso de informacion para el proceso de
	 * solicitar o editar un consecutivo de correspondencia
	 *
	 * @param solicitud, DTO con los datos de la solicitud
	 * @return Lista de mensajes con los errores encontrados solo si lo hay
	 */
  public validarCamposIngresoInformacion(solicitud: SolicitudConsecutivoDTO): Observable<Array<MessageResponseDTO>> {
    return this.http.post<Array<MessageResponseDTO>>(
      CorrespondenciaAPIConstant.URL_VALIDAR_CAMPOS_INGRESO,
      solicitud
    );
  }

  /**
	 * Servicio que permite soportar el proceso de negocio de solicitar
	 * un consecutivo de correspondencia para una nomenclatura
	 *
	 * @param solicitud, DTO que contiene los datos de la solicitud
	 * @return DTO con los datos de la respuesta
	 */
  public solicitarConsecutivo(solicitud: SolicitudConsecutivoDTO): Observable<SolicitudConsecutivoResponseDTO> {
    return this.http.post<SolicitudConsecutivoResponseDTO>(
      CorrespondenciaAPIConstant.URL_SOLICITAR_CONSECUTIVO,
      solicitud
    );
  }

  /**
	 * Servicio que permite obtener los datos para la pagina de bienvenida
	 *
	 * @param idCliente, identificador del cliente autenticado
	 * @return DTO con los datos de bienvenida
	 */
  public getDatosBienvenida(idCliente: number): Observable<WelcomeInitDTO> {
    return this.http.get<WelcomeInitDTO>(
      CorrespondenciaAPIConstant.URL_GET_DATOS_WELCOME + idCliente
    );
  }

  /**
	 * Servicio para el cargue de documento asociado a un consecutivo
   *
   * @param datosCargue, contiene los valores de los parametros del cargue
   * @return lista de documentos asociados al consecutivo
	 */
  public cargarDocumento(datosCargue: FormData): Observable<Array<DocumentoDTO>> {
    return this.http.post<Array<DocumentoDTO>>(
      CorrespondenciaAPIConstant.URL_CARGAR_DOCUMENTO,
      datosCargue
    );
  }

  /**
	 * Servicio que soporta el proceso de negocio para la descarga
	 * de un documento de correspondencia en AWS-S3
	 *
	 * @param idCliente, se utiliza para identificar el cliente que tiene el documento
	 * @param idDocumento, se utiliza para consultar los datos del documento
	 * @return Documento descargado con todos sus atributos
	 */
  public descargarDocumento(idCliente: string, idDocumento: string): Observable<any> {
    const url = `${CorrespondenciaAPIConstant.URL_DESCARGAR_DOCUMENTO}?idCliente=${idCliente}&idDocumento=${idDocumento}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  /**
	 * Servicio para eliminar un documento asociado al consecutivo
   *
   * @param datos, Contiene los datos del documento eliminar
   * @return lista de documentos asociados al consecutivo
	 */
  public eliminarDocumento(datos: DocumentoDTO): Observable<Array<DocumentoDTO>> {
    return this.http.post<Array<DocumentoDTO>>(
      CorrespondenciaAPIConstant.URL_ELIMINAR_DOCUMENTO,
      datos
    );
  }

  /**
	 * Servicio que permite obtener los consecutivos del anio actual de acuerdo al
	 * filtro de busqueda
	 *
	 * @param filtro, DTO que contiene los valores del filtro de busqueda
	 * @return DTO con la lista de consecutivos paginados y su cantidad total
	 */
  public getConsecutivosAnioActual(filtro: FiltroConsecutivosAnioActualDTO): Observable<PaginadorResponseDTO> {
    return this.http.post<PaginadorResponseDTO>(
      CorrespondenciaAPIConstant.GET_CONSECUTIVOS_ACTUAL,
      filtro
    );
  }

  /**
	 * Servicio que permite obtener los datos iniciales para el
	 * submodulo de Consecutivos de correspondencia solicitados
	 * para el anio actual
	 *
	 * @param idCliente, identificador del cliente autenticado
	 * @return DTO con los datos iniciales
	 */
  public getInitConsecutivosAnioActual(idCliente: number): Observable<InitConsecutivosAnioActualDTO> {
    return this.http.get<InitConsecutivosAnioActualDTO>(
      CorrespondenciaAPIConstant.GET_INIT_CONSECUTIVOS_ACTUAL + idCliente
    );
  }

  /**
	 * Servicio que permite consultar el detalle de un consecutivo
	 *
	 * @param filtro, DTO que contiene los identificadores del cliente y del consecutivo
	 * @return DTO con los datos del consecutivo
	 */
  public getDetalleConsecutivo(filtro: ConsecutivoDetalleDTO): Observable<ConsecutivoDetalleDTO> {
    return this.http.post<ConsecutivoDetalleDTO>(
      CorrespondenciaAPIConstant.GET_DETALLE_CONSECUTIVO,
      filtro
    );
  }
}
