import { AppDomainConstant } from './app-domain.constant';

/**
 * Clase que contiene todas las constantes para el modulo de configuraciones
 *
 * @author Carlos Andres Diaz
 */
export class ConfiguracionesConstant {

  /** Nombre del REST para el modulo configuraciones*/
  static readonly CONFIGURACIONES_API: string = 'configuracionesapi/';

  /** URL del recurso para la creacion del cliente*/
  static readonly URL_CREAR_CLIENTE: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'crearclientes';

  /** URL del recurso para modificar el cliente*/
  static readonly URL_MODIFICAR_CLIENTE: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'modificarcliente';

  /** URL del recurso para eliminar el cliente*/
  static readonly URL_ELIMINAR_CLIENTE: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'eliminarcliente';
}
