import { AppDomainConstant } from './app-domain.constant';

/**
 * Clase que contiene todas las constantes de la API para el modulo de Correspondencia
 *
 * @author Carlos Andres Diaz
 */
export class CorrespondenciaAPIConstant {

  /** Nombre del REST para el modulo correspondencia*/
  static readonly CORRESPONDENCIA_API: string = 'corresapi/';

  /** URL del recurso para obtener el detalle de la nomenclatura*/
  static readonly GET_DTL_NOMENCLATURA: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'dtlnomenclatura?idNomenclatura=';

  /** URL del recurso para obtener los campos asociados a una nomenclatura*/
  static readonly GET_DTL_NOMENCLATURA_CAMPOS: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'dtlnomenclaturacampos?idNomenclatura=';

  /** URL del recurso para obtener los datos iniciales para solicitar consecutivos*/
  static readonly INIT_CORRESPONDENCIA: string =
    AppDomainConstant.ADMINFREE +
    CorrespondenciaAPIConstant.CORRESPONDENCIA_API +
    'initcorrespondencia?idCliente=';
}
