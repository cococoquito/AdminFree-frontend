/** Contiene los enums transversal para toda la aplicacion*/
export enum AppEnum {
  DOMINIO_REST = 'http://localhost:19090/'
}

/** Enums para los nombre de los servicios REST del modulo de configuraciones*/
export enum ApiConfiguracionesEnum {
  CONFIGURACIONES_API = 'configuracionesapi/',
  CLIENTES = 'clientes',
  CREAR_CLIENTES = 'crearclientes',
  MODIFICAR_CLIENTE = 'modificarcliente',
  ELIMINAR_CLIENTE = 'eliminarcliente'
}

/** Enums para los nombre de los servicios REST del modulo de seguridad*/
export enum ApiSeguridadEnum {
  SEGURIDAD_API = 'authapi/',
  ADMIN_CLIENTES_ENTRAR = 'adminclientesentrar'
}

/** Enums para la seguridad del sistema peticiones REST*/
export enum SecurityEnum {
  auth_user = 'f0f38460e739a72f40a009c639767fb7',
  auth_pass = '5262d63d2f90a94ac51521abc7c3539f',
  auth_token = 'dffa627a756bf5ce0dcbe9477eac1482',
  post_angular_auth = 'jtizq',
  post_angular = 'apwni'
}
