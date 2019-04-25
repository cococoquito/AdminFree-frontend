import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ArchivoGestionAPIConstant } from '../constants/apis/archivo-gestion-api.constant';
import { FiltroSerieDocumentalDTO } from '../dtos/archivogestion/filtro-serie-documental.dto';
import { PaginadorResponseDTO } from '../dtos/transversal/paginador-response.dto';
import { TipoDocumentalDTO } from '../dtos/archivogestion/tipo-documental.dto';
import { MessageResponseDTO } from '../dtos/transversal/message-response.dto';
import { SerieDocumentalDTO } from '../dtos/archivogestion/serie-documental.dto';
import { SubSerieDocumentalDTO } from '../dtos/archivogestion/sub-serie-documental.dto';

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
	 * @return Lista de tipos documentales
	 */
  public getTiposDocumentales(): Observable<Array<TipoDocumentalDTO>> {
    return this.http.get<Array<TipoDocumentalDTO>>(ArchivoGestionAPIConstant.URL_GET_TIPOS_DOCUMENTALES);
  }

  /**
	 * Servicio que permite administrar los tipos documentales
	 * aplica solamente para CREAR, EDITAR, ELIMINAR
	 *
	 * @param tipo, contiene los datos del tipo documental a procesar
	 */
  public administrarTiposDocumentales(tipo: TipoDocumentalDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ArchivoGestionAPIConstant.URL_ADMIN_TIPOS_DOCUMENTAL,
      tipo
    );
  }

  /**
	 * Servicio que permite administrar la entidad de series documentales
	 * aplica solamente para CREAR, EDITAR, ELIMINAR
	 *
	 * @param serie, DTO con los datos de la serie documental
	 */
  public administrarSerieDocumental(serie: SerieDocumentalDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ArchivoGestionAPIConstant.URL_ADMIN_SERIES,
      serie
    );
  }

  /**
	 * Servicio que permite administrar la entidad de sub-serie documental
	 * aplica solamente para CREAR, EDITAR, ELIMINAR
	 *
	 * @param subserie, DTO con los datos de la sub-serie documental
	 */
  public administrarSubSerieDocumental(subserie: SubSerieDocumentalDTO): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      ArchivoGestionAPIConstant.URL_ADMIN_SUBSERIES,
      subserie
    );
  }
}
