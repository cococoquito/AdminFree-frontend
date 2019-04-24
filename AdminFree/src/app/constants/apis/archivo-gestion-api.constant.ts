import { AppDomainConstant } from './app-domain.constant';

/**
 * Clase que contiene todas las constantes de la API para el modulo de archivo de gestion
 *
 * @author Carlos Andres Diaz
 */
export class ArchivoGestionAPIConstant {

  /** Nombre del REST para el modulo archivo de gestion*/
  static readonly ARCHIVO_GESTION_API: string = 'archivoapi/';

  /** URL del recurso que permite obtener las series documentales de acuerdo al filtro de busqueda*/
  static readonly URL_GET_SERIES: string =
    AppDomainConstant.ADMINFREE +
    ArchivoGestionAPIConstant.ARCHIVO_GESTION_API +
    'getseries';

  /** URL del recurso que permite administrar los tipos documentales*/
  static readonly URL_ADMIN_TIPOS_DOCUMENTAL: string =
    AppDomainConstant.ADMINFREE +
    ArchivoGestionAPIConstant.ARCHIVO_GESTION_API +
    'admintiposdoc';

  /** URL del recurso que permite administrar la entidad de series documentales*/
  static readonly URL_ADMIN_SERIES: string =
    AppDomainConstant.ADMINFREE +
    ArchivoGestionAPIConstant.ARCHIVO_GESTION_API +
    'adminseries';

  /** URL del recurso que permite administrar la entidad de sub-serie documental*/
  static readonly URL_ADMIN_SUBSERIES: string =
    AppDomainConstant.ADMINFREE +
    ArchivoGestionAPIConstant.ARCHIVO_GESTION_API +
    'adminsubseries';
}
