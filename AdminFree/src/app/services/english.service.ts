import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SerieDTO } from '../dtos/english/serie.dto';
import { EnglishAPIConstant } from '../constants/apis/english.constant';
import { MessageResponseDTO } from '../dtos/transversal/message-response.dto';
import { ChapterDTO } from '../dtos/english/chapter.dto';
import { SentenceDTO } from '../dtos/english/sentence.dto';

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
	 * Service para la creacion de una serie
	 * @param parametros, contiene los datos de la serie a crear
	 */
  public createSerie(parametros: FormData): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(
      EnglishAPIConstant.URL_CREATE_SERIE,
      parametros
    );
  }

	/**
	 * Servicio que permite cargar las series parametrizadas en el sistema
	 */
  public getSeries(): Observable<Array<SerieDTO>> {
    return this.http.get<Array<SerieDTO>>(EnglishAPIConstant.URL_GET_SERIES);
  }

  /**
	 * Service que permite obtener los detalles de una serie
	 *
	 * @param idSerie, identificador de la serie
	 * @return DTO con el detalle de la serie
	 */
  public getDetailSerie(idSerie: number): Observable<SerieDTO> {
    return this.http.post<SerieDTO>(EnglishAPIConstant.URL_GET_DETAIL_SERIE, idSerie);
  }

  /**
	 * Service que permite agregar una temporada para esta serie
	 *
	 * @param idSerie, identificador de la serie
	 * @return DTO con el detalle de la serie
	 */
  public addSeason(idSerie: number): Observable<SerieDTO> {
    return this.http.post<SerieDTO>(EnglishAPIConstant.URL_ADD_SEASON, idSerie);
  }

	/**
	 * Service que permite agregar un capitulo a una temporada
	 * @param chapter, DTO con los datos del capitulo
	 * @return DTO con el detalle de la serie
	 */
  public addChapter(chapter: ChapterDTO): Observable<SerieDTO> {
    return this.http.post<SerieDTO>(EnglishAPIConstant.URL_ADD_CHAPTER, chapter);
  }

	/**
	 * Service que permite consultar el detalle del capitulo
	 * @param idChapter, identificador del capitulo
	 * @return DTO con los datos del capitulo
	 */
  public getDetailChapter(idChapter: number): Observable<ChapterDTO> {
    return this.http.post<ChapterDTO>(EnglishAPIConstant.URL_DETAIL_CHAPTER, idChapter);
  }

	/**
	 * Service que permite ingresar los datos basicos de la sentencia
	 * @param sentence, DTO con los datos de la sentencia
	 * @return DTO con el identificador de la sentencia
	 */
  public insertSentence(sentence: SentenceDTO): Observable<SentenceDTO> {
    return this.http.post<SentenceDTO>(EnglishAPIConstant.URL_INSERT_SENTENCE, sentence);
  }

	/**
	 * Service para almacenar el sonido a la sentencia
	 * @param parametros, contiene todos los valores necesarios
	 * @return Detalle del capitulo que contiene esta sentencia
	 */
  public downloadSound(parametros: FormData): Observable<ChapterDTO> {
    return this.http.post<ChapterDTO>(
      EnglishAPIConstant.URL_DOWNLOAD_SOUND,
      parametros
    );
  }
}
