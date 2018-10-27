/**
 * Enum que contiene los mensaje de negocio del sistema
 */
export enum BusinessMessage {

  /** Mensaje cuando el usuario intenta ingresar con una credenciales incorrecta */
  AUTENTICACION_FALLIDA = 'El Usuario y la Contraseña que usted ingresó no ha sido reconocido. Por favor, inténtelo de nuevo.',

  /** Mensaje cuando el usuario intenta ingresar al recurso de ADMINFREE sin el TOKEN */
  AUTORIZACION_FALLIDA = 'No estas autorizado para acceder a este recurso',

  /** Mensaje cuando se presenta un error interno en el servidor */
  INTERNAL_SERVER_ERROR = 'Error interno del servidor: '
}
