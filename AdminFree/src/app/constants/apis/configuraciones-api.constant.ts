import { AppDomainConstant } from './app-domain.constant';

/**
 * Clase que contiene todas las constantes de la API para el modulo de configuraciones
 *
 * @author Carlos Andres Diaz
 */
export class ConfiguracionesAPIConstant {

  /** Nombre del REST para el modulo configuraciones*/
  static readonly CONFIGURACIONES_API: string = 'configuracionesapi/';

  /** URL del recurso para la creacion del cliente*/
  static readonly URL_CREAR_CLIENTE: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'crearclientes';

  /** URL del recurso para modificar el cliente*/
  static readonly URL_MODIFICAR_CLIENTE: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'modificarcliente';

  /** URL del recurso para eliminar el cliente*/
  static readonly URL_ELIMINAR_CLIENTE: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'eliminarcliente';

  /** URL del recurso para obtener los clientes activo/inactivo*/
  static readonly URL_GET_CLIENTES_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'clientesusuario';

  /** URL del recurso para la creacion de los usuarios*/
  static readonly URL_CREAR_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'crearuser';

  /** URL del recurso para la edicion de los usuarios*/
  static readonly URL_EDITAR_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'editaruser';

  /** URL del recurso para validar los datos del usuario*/
  static readonly URL_VALIDAR_DATOS_USER: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'validardatosuser';

  /** URL del recurso para la modificacion del estado del usuario*/
  static readonly URL_MODIFICAR_ESTADO_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'updatestateuser';

  /** URL del recurso para generar nuevos TOKENs de ingreso para el usuario o cliente*/
  static readonly URL_GENERAR_CLAVE_INGRESO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'generarclavein';

  /** URL del recurso para crear un campo de entrada de informacion*/
  static readonly URL_CREAR_CAMPO_ENTRADA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'crearcampoin';

  /** URL del recurso para listar los campos de entrada asociado a un cliente*/
  static readonly URL_GET_CAMPOS_ENTRADA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'getcamposin';

  /** URL del recurso para obtener los detalles de un campo asociado a una nomenclatura*/
  static readonly URL_GET_DETALLE_NOMENCLATURA_CAMPO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'getdtlcampoin';

  /** URL del recurso para eliminar un campo de entrada de informacion*/
  static readonly URL_DELETE_CAMPO_ENTRADA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'deletecampoin?idCampo=';

  /** URL del recurso para obtener el detalle de un campo para editar*/
  static readonly URL_GET_DETALLE_CAMPO_EDITAR: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'getdtlcampoedi?idCampo=';

  /** URL del recurso para editar un campo de entrada de informacion*/
  static readonly URL_EDITAR_CAMPO_ENTRADA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'editarcampoin';

  /** URL del recurso para la validar los datos basicos de un campo de entrada*/
  static readonly URL_VALIDAR_DATOS_ENTRADA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'vdatosin';

  /** URL del recurso que permite obtener todas las nomenclaturas asociadas a un cliente*/
  static readonly URL_GET_NOMENCLATURAS: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'getnomenclaturas?idCliente=';

  /** URL del recurso que permite crear una nomenclatura*/
  static readonly URL_CREAR_NOMENCLATURA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'crearnomenclatura';

  /** URL del recurso que permite editar la nomenclatura*/
  static readonly URL_EDITAR_NOMENCLATURA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'editarnomenclatura';

  /** URL del recurso que permite validar si la nomenclatura ya existe en el sistema*/
  static readonly URL_VALIDAR_EXISTE_NOMENCLATURA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'existenomenclatura';

  /** URL del recurso que permite eliminar una nomenclatura del sistema*/
  static readonly URL_ELIMINAR_NOMENCLATURA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'deletenomenclatura?idNomenclatura=';

  /** URL del recurso que permite consultar el detalle de la nomenclatura*/
  static readonly URL_GET_DETALLE_NOMENCLATURA: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'getdtlnomenclatura?idNomenclatura=';

  /** URL del recurso que permite modificar la cuenta del usuario*/
  static readonly MODIFICAR_CUENTA_USUARIO: string =
    AppDomainConstant.ADMINFREE +
    ConfiguracionesAPIConstant.CONFIGURACIONES_API +
    'updateusercount';
}
