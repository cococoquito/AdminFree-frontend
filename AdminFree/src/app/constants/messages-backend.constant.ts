/**
 * Clase constante que contiene los mensajes y codigo retornados
 * por el backend al ejecutar algun proceso de negocio
 *
 * @author Carlos Andres Diaz
 */
export class MessagesBackendConstant {

  /** Mensaje cuando el USER intenta ingresar con una credenciales incorrecta */
  static readonly AUTENTICACION_FALLIDA_USER: string =
    'El Usuario y la Contraseña que ingresó no ha sido reconocido';

  /** Mensaje cuando el ADMIN intenta ingresar con una credenciales incorrecta */
  static readonly AUTENTICACION_FALLIDA_ADMIN: string =
    'El Usuario y el Token que ingresó no ha sido reconocido';

  /** Mensaje cuando el usuario intenta ingresar al recurso de ADMINFREE sin el TOKEN */
  static readonly AUTORIZACION_FALLIDA: string =
    'No estas autorizado para acceder a este recurso';

  /** Mensaje cuando se presenta un error interno en el servidor */
  static readonly INTERNAL_SERVER_ERROR: string =
    'Se presentó un error interno en el servidor';

  /** El valor del 'Usuario de Ingreso' ya se encuentra asociado a otro usuario */
  static readonly USUARIO_INGRESO_EXISTE: string =
    'El valor del <strong>Usuario de Ingreso</strong> ya se encuentra asociado a otro usuario';

  /** La contrasenia de verificación no coincide*/
  static readonly CLAVE_VERIFICACION_NO_COINCIDE: string =
    'La contraseña de verificación no coincide';

  /** La nueva contrasenia debe tener al menos 12 caracteres */
  static readonly CLAVE_LONGITUD_NO_PERMITIDA: string =
    'La nueva contraseña debe tener al menos 12 caracteres';

  /** La nueva contrasenia no puede contener espacios en blanco */
  static readonly CLAVE_ESPACIOS_BLANCO: string =
    'La nueva contraseña no puede contener espacios en blanco';

  /** La contrasenia actual no coincide con la contrasenia del usuario autenticado */
  static readonly CLAVE_NO_COINCIDE: string =
    'La contraseña actual no coincide con la contraseña del usuario autenticado';

  /** La nueva contrasenia debe ser diferente a la contrasenia actual */
  static readonly CLAVE_ACTUAL_IGUAL: string =
    'La nueva contraseña debe ser diferente a la contraseña actual';
}
