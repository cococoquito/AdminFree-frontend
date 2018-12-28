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

  /** URL del recurso para validar los datos del usuario*/
  static readonly URL_VALIDAR_DATOS_USER: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'validardatosuser';

  /** URL del recurso para la modificacion del estado del usuario*/
  static readonly URL_MODIFICAR_ESTADO_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'updatestateuser';

  /** URL del recurso para la generacion de la clave de ingreso del usuario*/
  static readonly URL_GENERAR_CLAVE_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'generarclaveuser';

  /** URL del recurso para la modificacion de los datos de la cuenta de usuario*/
  static readonly URL_MODIFICAR_DATOS_CUENTA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'updateaccount';

  /** URL del recurso para la modificacion de la clave de ingreso*/
  static readonly URL_MODIFICAR_CLAVE: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'updateclaveuser';

  /** URL del recurso para crear un campo de entrada de informacion*/
  static readonly URL_CREAR_CAMPO_ENTRADA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'crearcampoin';

  /** URL del recurso para listar los campos de entrada asociado a un cliente*/
  static readonly URL_GET_CAMPOS_ENTRADA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'getcamposin?idCliente=';

  /** URL del recurso para obtener los detalles de un campo de entrada*/
  static readonly URL_GET_DETALLE_CAMPO_ENTRADA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'getdtlcampoin?idCampo=';

  /** URL del recurso para eliminar un campo de entrada de informacion*/
  static readonly URL_DELETE_CAMPO_ENTRADA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'deletecampoin?idCampo=';

  /** URL del recurso para obtener el detalle de un campo para editar*/
  static readonly URL_GET_DETALLE_CAMPO_EDITAR: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'getdtlcampoedi?idCampo=';

  /** URL del recurso para editar un campo de entrada de informacion*/
  static readonly URL_EDITAR_CAMPO_ENTRADA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'editarcampoin';

  /** URL del recurso para la validar los datos basicos de un campo de entrada*/
  static readonly URL_VALIDAR_DATOS_ENTRADA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesConstant.CONFIGURACIONES_API +
    'vdatosin';
}
