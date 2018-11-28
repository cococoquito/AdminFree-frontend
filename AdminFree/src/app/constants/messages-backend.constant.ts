/**
 * Clase constante que contiene los mensajes y codigo retornados
 * por el backend al ejecutar algun proceso de negocio
 *
 * @author Carlos Andres Diaz
 */
export class MessagesBackendConstant {

  /** Codigo cuando el USER intenta ingresar con una credenciales incorrecta */
  static readonly COD_AUTENTICACION_FALLIDA_USER: string = '1';

  /** Codigo cuando el ADMIN intenta ingresar con una credenciales incorrecta */
  static readonly COD_AUTENTICACION_FALLIDA_ADMIN: string = '2';

  /** Mensaje cuando el USER intenta ingresar con una credenciales incorrecta */
  static readonly AUTENTICACION_FALLIDA_USER: string = 'El Usuario y la Contraseña que ingresó no ha sido reconocido.';

  /** Mensaje cuando el ADMIN intenta ingresar con una credenciales incorrecta */
  static readonly AUTENTICACION_FALLIDA_ADMIN: string = 'El Usuario y el Token que ingresó no ha sido reconocido.';

  /** Mensaje cuando el usuario intenta ingresar al recurso de ADMINFREE sin el TOKEN */
  static readonly AUTORIZACION_FALLIDA: string = 'No estas autorizado para acceder a este recurso';

  /** Mensaje cuando se presenta un error interno en el servidor */
  static readonly INTERNAL_SERVER_ERROR: string = 'Se presentó un error interno en el servidor';
}
