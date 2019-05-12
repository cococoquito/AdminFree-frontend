import { AppDomainConstant } from './app-domain.constant';

/**
 * Clase que contiene todas las constantes de la API para el modulo de archivo de gestion
 *
 * @author Carlos Andres Diaz
 */
export class ArchivoGestionAPIConstant {

  /** Nombre del REST para el modulo archivo de gestion*/
  static readonly ARCHIVO_GESTION_API: string = 'archivoapi/';

  /** URL del recurso que permite obtener los datos de inicio para el submodulo de series documentales */
  static readonly URL_GET_INIT_ADMIN_SERIES_DOC: string =
    AppDomainConstant.ADMINFREE +
    ArchivoGestionAPIConstant.ARCHIVO_GESTION_API +
    'getinitadminseriesdoc';

  /** URL del recurso que permite obtener las series documentales de acuerdo al filtro de busqueda*/
  static readonly URL_GET_SERIES: string =
    AppDomainConstant.ADMINFREE +
    ArchivoGestionAPIConstant.ARCHIVO_GESTION_API +
    'getseries';

  /** URL del recurso que permite obtener todos los tipos documentales parametrizados*/
  static readonly URL_GET_TIPOS_DOCUMENTALES: string =
    AppDomainConstant.ADMINFREE +
    ArchivoGestionAPIConstant.ARCHIVO_GESTION_API +
    'gettiposdocumentales?idCliente=';

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

  /** URL del recurso que permite obtener las subseries documentales relacionadas a una serie documental*/
  static readonly URL_GET_SUBSERIES: string =
    AppDomainConstant.ADMINFREE +
    ArchivoGestionAPIConstant.ARCHIVO_GESTION_API +
    'getsubseries?idSerie=';
}
