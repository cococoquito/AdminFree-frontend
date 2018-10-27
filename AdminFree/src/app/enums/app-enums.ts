/** Contiene los dominios de la aplicacion*/
enum AppDomain {
  ADMINFREE = 'http://localhost:19090/'
}

/** Enum para los nombre de los recursos del modulo de configuraciones*/
enum ModuloConfiguraciones {
  CONFIGURACIONES_API = 'configuracionesapi/',
  CLIENTES = 'clientes',
  CREAR_CLIENTES = 'crearclientes',
  MODIFICAR_CLIENTE = 'modificarcliente',
  ELIMINAR_CLIENTE = 'eliminarcliente'
}

/** Enum para los nombre de los recursos del modulo de seguridad*/
enum ModuloSeguridad {
  SEGURIDAD_API = 'authapi/',
  ADMIN_CLIENTES_AUTH = 'adminclientesauth'
}

/** Enum que contiene las URLs para los recursos del modulo de Configuraciones*/
export enum ModuloConfiguracionesURL {
  CLIENTES =
    AppDomain.ADMINFREE +
    ModuloConfiguraciones.CONFIGURACIONES_API +
    ModuloConfiguraciones.CLIENTES,

  CREAR_CLIENTES =
    AppDomain.ADMINFREE +
    ModuloConfiguraciones.CONFIGURACIONES_API +
    ModuloConfiguraciones.CREAR_CLIENTES,

  MODIFICAR_CLIENTE =
    AppDomain.ADMINFREE +
    ModuloConfiguraciones.CONFIGURACIONES_API +
    ModuloConfiguraciones.MODIFICAR_CLIENTE,

  ELIMINAR_CLIENTE =
    AppDomain.ADMINFREE +
    ModuloConfiguraciones.CONFIGURACIONES_API +
    ModuloConfiguraciones.ELIMINAR_CLIENTE
}

/** Enum que contiene las URLs para los recursos del modulo de Seguridad*/
export enum ModuloSeguridadURL {
  ADMIN_CLIENTES_AUTH =
    AppDomain.ADMINFREE +
    ModuloSeguridad.SEGURIDAD_API +
    ModuloSeguridad.ADMIN_CLIENTES_AUTH
}

/** Enums para la seguridad del sistema*/
export enum AppSecurity {
  auth_user = 'f0f38460e739a72f40a009c639767fb7',
  auth_pass = '5262d63d2f90a94ac51521abc7c3539f',
  auth_token = 'dffa627a756bf5ce0dcbe9477eac1482',
  content = 'application/json;charset=UTF-8',
  post_angular_auth = 'jtizq',
  post_angular = 'apwni'
}

/** Enums que contiene los KEYs del localstore*/
export enum keyLocalStore {
  KEY_USER_SECURITY = 'USER_SECURITY',
  KEY_ADMIN_CLIENTES = 'ADMIN_CLIENTES'
}

export enum HttpStatus {
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500
}

export enum CodigoBusinessMessage {
  COD_AUTENTICACION_FALLIDA = '1',
  COD_AUTORIZACION_FALLIDA = '2'
}
