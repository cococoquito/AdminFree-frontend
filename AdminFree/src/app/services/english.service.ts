import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SerieDTO } from '../dtos/english/serie.dto';
import { EnglishAPIConstant } from '../constants/apis/english.constant';
import { MessageResponseDTO } from '../dtos/transversal/message-response.dto';
import { ChapterDTO } from '../dtos/english/chapter.dto';

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
   * Service que permite crear una serie en el sistema
   * @param img, Imagen asociada a la serie
   * @param name, nombre de la serie a crear
   * @param url, direccion de la pagina de esta serie
   */
  public createSerie(parametros: FormData): Observable<MessageResponseDTO> {
    return this.http.post<MessageResponseDTO>(EnglishAPIConstant.URL_CREATE_SERIE, parametros);
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
    return this.http.post<SerieDTO>(EnglishAPIConstant.URL_DETAIL_SERIE, idSerie);
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
   * Service que permite crear una sentencia en el sistema
   * @param audio, es el audio de la sentencia
   * @param idChapter, identificador del capitulo
   * @param spanish, la sentencia en espaniol
   * @param english, la sentencia en ingles
   * @return detalle del capitulo con todas sus sentencias
   */
  public createSentence(parametros: FormData): Observable<ChapterDTO> {
    return this.http.post<ChapterDTO>(EnglishAPIConstant.URL_CREATE_SENTENCE, parametros);
  }

	/**
	 * Service que permite editar una sentencia en el sistema
	 * @param audio, es el audio de la sentencia
	 * @param idChapter, identificador del capitulo
	 * @param idSentence, identificador de la sentence
	 * @param spanish, la sentencia en espaniol
	 * @param english, la sentencia en ingles
	 * @return detalle del capitulo con todas sus sentencias
	 */
  public editSentence(parametros: FormData): Observable<ChapterDTO> {
    return this.http.post<ChapterDTO>(EnglishAPIConstant.URL_EDIT_SENTENCE, parametros);
  }
}
