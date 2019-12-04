import { AppDomainConstant } from './app-domain.constant';

/**
 * Clase que contiene todas las constantes de la API para el modulo de learning english
 *
 * @author Carlos Andres Diaz
 */
export class EnglishAPIConstant {

  /** Nombre del REST para el modulo learning english*/
  static readonly ENGLISH_API: string = 'englishapi/';

  /** URL del recurso para la creacion de las series*/
  static readonly URL_CREATE_SERIE: string =
    AppDomainConstant.ADMINFREE +
    EnglishAPIConstant.ENGLISH_API +
    'createserie';

  /** URL del recurso para cargar una imagen de la serie*/
  static readonly URL_DOWNLOAD_IMG_SERIE: string =
    AppDomainConstant.ADMINFREE +
    EnglishAPIConstant.ENGLISH_API +
    'downloadimgserie';

  /** URL del recurso para obtener las series parametrizadas en el sistema */
  static readonly URL_GET_SERIES: string =
    AppDomainConstant.ADMINFREE +
    EnglishAPIConstant.ENGLISH_API +
    'getseries';

  /** URL del recurso para obtener el detalle de la serie */
  static readonly URL_GET_DETAIL_SERIE: string =
    AppDomainConstant.ADMINFREE +
    EnglishAPIConstant.ENGLISH_API +
    'detailserie';

  /** URL del recurso para agregar una temporada */
  static readonly URL_ADD_SEASON: string =
    AppDomainConstant.ADMINFREE +
    EnglishAPIConstant.ENGLISH_API +
    'addseason';
}
