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

  /** URL del recurso para obtener los clientes activo/inactivo*/
  static readonly URL_GET_CLIENTES_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'clientesusuario';

  /** URL del recurso para la creacion de los usuarios*/
  static readonly URL_CREAR_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'crearuser';

  /** URL del recurso para la modificacion del estado del usuario*/
  static readonly URL_MODIFICAR_ESTADO_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'updatestateuser';

  /** URL del recurso para la modificacion de los privilegios del usuario*/
  static readonly URL_MODIFICAR_PRIVILEGIOS_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'updateprivilegiosuser';

  /** URL del recurso para la generacion de la clave de ingreso del usuario*/
  static readonly URL_GENERAR_CLAVE_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'generarclaveuser';
}
