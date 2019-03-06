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
  static readonly GET_CONSECUTIVOS_ACTUAL: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'getconsecutivosactual';

  /** URL del recurso para obtener los datos iniciales para el
	 * submodulo de Consecutivos de correspondencia solicitados */
  static readonly GET_INIT_CONSECUTIVOS_ACTUAL: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'getinitconsecutivosactual?idCliente=';

  /** URL del recurso que permite consultar el detalle de un consecutivo */
  static readonly GET_DETALLE_CONSECUTIVO: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'getdetalleconsecutivo';
}
