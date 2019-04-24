import { AppDomainConstant } from './app-domain.constant';

/**
 * Clase que contiene todas las constantes de la API para el modulo de Correspondencia
 *
 * @author Carlos Andres Diaz
 */
export class CorrespondenciaAPIConstant {

  /** Nombre del REST para el modulo correspondencia*/
  static readonly CORRESPONDENCIA_API: string = 'corresapi/';

  /** URL del recurso para obtener los campos asociados a una nomenclatura*/
  static readonly URL_GET_DTL_NOMENCLATURA_CAMPOS: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'dtlnomenclaturacampos?idNomenclatura=';

  /** URL del recurso para obtener los datos iniciales para solicitar consecutivos*/
  static readonly URL_INIT_CORRESPONDENCIA: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'initcorrespondencia?idCliente=';

  /** URL del recurso para validar los campos de ingreso de informacion*/
  static readonly URL_VALIDAR_CAMPOS_INGRESO: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'validcamposingreso';

  /** URL del recurso para solicitar un consecutivo de correspondencia*/
  static readonly URL_SOLICITAR_CONSECUTIVO: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'solicitarconsecutivo';

  /** URL del recurso para obtener los datos para la pagina de bienvenida */
  static readonly URL_GET_DATOS_WELCOME: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'datosbienvenida?idCliente=';

  /** URL del recurso para el cargue de documento asociado a un consecutivo */
  static readonly URL_CARGAR_DOCUMENTO: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'cargardocumento';

  /** URL del recurso para el descargue de documento de correspondencia */
  static readonly URL_DESCARGAR_DOCUMENTO: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'descargardocumento';

  /** URL del recurso para eliminar un documento asociado a un consecutivo */
  static readonly URL_ELIMINAR_DOCUMENTO: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'eliminardocumento';

  /** URL del recurso para obtener los consecutivos anio actual */
  static readonly URL_GET_CONSECUTIVOS_ACTUAL: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'getconsecutivosactual';

  /** URL del recurso para obtener los datos iniciales para el
  * submodulo de Consecutivos de correspondencia solicitados */
  static readonly URL_GET_INIT_CONSECUTIVOS_ACTUAL: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'getinitconsecutivosactual?idCliente=';

  /** URL del recurso para obtener los datos iniciales para el
  * submodulo de Mis Consecutivos de correspondencia solicitados */
  static readonly URL_GET_INIT_MIS_CONSECUTIVOS: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'getinitmisconsecutivos';

  /** URL del recurso que permite consultar el detalle de un consecutivo */
  static readonly URL_GET_DETALLE_CONSECUTIVO: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'getdetalleconsecutivo';

  /** URL del recurso que permite obtener los campos para los filtros de busqueda */
  static readonly URL_GET_CAMPOS_FILTRO: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'getcamposfiltro?idCliente=';

  /** URL del recurso que permite obtener los items para los filtros tipo LISTA DESPLEGABLE */
  static readonly URL_GET_ITEMS_SELECT_FILTRO: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'getitemsfiltro';

  /** URL del recurso que permite cambiar el estado del consecutivo */
  static readonly URL_ACTIVAR_ANULAR_CONSECUTIVO: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'activaranularconse';

  /** URL del recurso que permite transferir un consecutivo hacia otro usuario */
  static readonly URL_TRANSFERIR_CONSECUTIVO: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'transferirconse';

  /** URL del recurso que permite obtener los usuarios para el proceso de transferir consecutivo */
  static readonly URL_GET_USERS_TRANSFERIR: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'getusertransferir';

  /** URL del recurso que permite obtener los datos de un consecutivo para su edicion */
  static readonly URL_GET_CONSECUTIVO_EDICION: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'getconsedicion';

  /** URL del recurso que permite editar los valores de un consecutivo */
  static readonly URL_EDITAR_CONSECUTIVO_VALUES: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'editconsevalues';
}
