/**
 * Clase constante que contiene todos los mensajes y codigo de la aplicacion web
 *
 * @author Carlos Andres Diaz
 */
class MessagesConstant {

  /** Codigo para el mensaje de autenticacion fallida*/
  static readonly COD_AUTENTICACION_FALLIDA: string = '1';

  /** Mensaje cuando el usuario intenta ingresar con una credenciales incorrecta */
  static readonly AUTENTICACION_FALLIDA: string =
    'El Usuario y la Contraseña que usted ingresó no ha sido reconocido. Por favor, inténtelo de nuevo.';

  /** Mensaje cuando el usuario intenta ingresar al recurso de ADMINFREE sin el TOKEN */
  static readonly AUTORIZACION_FALLIDA: string =
    'No estas autorizado para acceder a este recurso';

  /** Mensaje cuando se presenta un error interno en el servidor */
  static readonly INTERNAL_SERVER_ERROR: string = 'Error interno del servidor: ';
}
