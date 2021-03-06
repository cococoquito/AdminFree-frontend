import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ArchivoGestionAPIConstant } from '../constants/apis/archivo-gestion-api.constant';
import { FiltroSerieDocumentalDTO } from '../dtos/archivogestion/filtro-serie-documental.dto';
import { PaginadorResponseDTO } from '../dtos/transversal/paginador-response.dto';
import { TipoDocumentalDTO } from '../dtos/archivogestion/tipo-documental.dto';
import { SerieDocumentalDTO } from '../dtos/archivogestion/serie-documental.dto';
import { SubSerieDocumentalDTO } from '../dtos/archivogestion/sub-serie-documental.dto';
import { InitAdminSeriesDocumentalesDTO } from '../dtos/archivogestion/init-admin-series-documentales.dto';

/**
 * Clase que contiene los servicios del modulo de archivo de gestion
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class ArchivoGestionService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) { }

  /**
	 * Metodo que permite obtener los datos de inicio para el submodulo de series documentales
	 *
	 * @param idCliente, identificador del cliente autenticado
	 * @return Response con los datos necesarios para el submodulo
	 */
  public getInitAdminSeriesDocumentales(idCliente: number): Observable<InitAdminSeriesDocumentalesDTO> {
    return this.http.post<InitAdminSeriesDocumentalesDTO>(
      ArchivoGestionAPIConstant.URL_GET_INIT_ADMIN_SERIES_DOC,
      idCliente
    );
  }

  /**
	 * Metodo que permite obtener las series documentales de acuerdo al filtro de busqueda
	 *
	 * @param filtro, DTO que contiene los datos del filtro de busqueda
	 * @return DTO con los datos del response con la lista de series documentales
	 */
  public getSeriesDocumentales(filtro: FiltroSerieDocumentalDTO): Observable<PaginadorResponseDTO> {
    return this.http.post<PaginadorResponseDTO>(
      ArchivoGestionAPIConstant.URL_GET_SERIES,
      filtro
    );
  }

  /**
	 * Metodo que permite obtener todos los tipos documentales parametrizados
	 *
   * @param idCliente, cada cliente tiene sus propios tipos documentales
	 * @return Lista de tipos documentales asociados al cliente
	 */
  public getTiposDocumentales(idCliente: number): Observable<Array<TipoDocumentalDTO>> {
    return this.http.get<Array<TipoDocumentalDTO>>(
      ArchivoGestionAPIConstant.URL_GET_TIPOS_DOCUMENTALES + idCliente
    );
  }

  /**
	 * Servicio que permite administrar la entidad de series documentales
	 * aplica solamente para CREAR, EDITAR, ELIMINAR
	 *
	 * @param serie, DTO con los datos de la serie documental
   * @return Objecto con la respuesta del proceso
	 */
  public administrarSerieDocumental(serie: SerieDocumentalDTO): Observable<any> {
    return this.http.post<any>(
      ArchivoGestionAPIConstant.URL_ADMIN_SERIES,
      serie
    );
  }

  /**
	 * Servicio que permite administrar la entidad de sub-serie documental
	 * aplica solamente para CREAR, EDITAR, ELIMINAR
	 *
	 * @param subserie, DTO con los datos de la sub-serie documental
   * @return Objecto con la respuesta del proceso
	 */
  public administrarSubSerieDocumental(subserie: SubSerieDocumentalDTO): Observable<any> {
    return this.http.post<any>(
      ArchivoGestionAPIConstant.URL_ADMIN_SUBSERIES,
      subserie
    );
  }

  /**
	 * Servicio que permite obtener las subseries documentales relacionadas a una serie documental
	 *
	 * @param idSerie, identificador de la serie documental
   * @return lista de subseries documentales relacionadas a una serie documental
	 */
  public getSubSeriesDocumental(idSerie: number): Observable<Array<SubSerieDocumentalDTO>> {
    return this.http.get<Array<SubSerieDocumentalDTO>>(ArchivoGestionAPIConstant.URL_GET_SUBSERIES + idSerie);
  }
}
