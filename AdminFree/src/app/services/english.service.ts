import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SeriesDTO } from '../dtos/english/serie.dto';
import { EnglishAPIConstant } from '../constants/apis/english.constant';
import { MessageResponseDTO } from '../dtos/transversal/message-response.dto';

/**
 * Clase que contiene los servicios del modulo de learning english
 *
 * @author Carlos Andres Diaz
 */
@Injectable()
export class EnglishService {

  /**
   * @param HTTP para hacer las peticiones a los servicios REST
   */
  constructor(private http: HttpClient) { }

  /**
	 * Metodo para la creacion de una serie
	 *
	 * @param serie, contiene los datos de la serie a crear
	 * @return Response con los datos de la nueva serie creada
	 */
  public createSerie(serie: SeriesDTO): Observable<SeriesDTO> {
    return this.http.post<SeriesDTO>(
      EnglishAPIConstant.URL_CREATE_SERIE,
      serie
    );
  }

  /**
	 * Servicio para cargar la imagen de la serie
   *
   * @param img, es la imagen a cargar
	 */
  public downloadImgSerie(img: FormData): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      EnglishAPIConstant.URL_DOWNLOAD_IMG_SERIE,
      img
    );
  }
}
