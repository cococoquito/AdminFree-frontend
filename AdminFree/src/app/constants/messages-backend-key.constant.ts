/**
 * Clase constante que contiene los identificadores
 * de los mensajes del negocio retornados del servidor
 *
 * @author Carlos Andres Diaz
 */
export class MessagesBackendKeyConstant {

  /** 400 - El Usuario y la Contraseña que ingresó no ha sido reconocido.*/
  static readonly KEY_AUTENTICACION_FALLIDA_USER: string = '1';

  /** 400 - El Usuario y el Token que ingresó no ha sido reconocido*/
  static readonly KEY_AUTENTICACION_FALLIDA_ADMIN: string = '2';

  /** 400 - El valor del usuario de ingreso (?) ya se encuentra asociado a otro usuario*/
  static readonly KEY_USUARIO_INGRESO_EXISTE: string = '3';

  /** 400 - La contrasenia de verificación no coincide*/
  static readonly KEY_CLAVE_VERIFICACION_NO_COINCIDE: string = '4';

  /** 400 - La nueva contrasenia debe tener al menos 12 caracteres*/
  static readonly KEY_CLAVE_LONGITUD_NO_PERMITIDA: string = '5';

  /** 400 - La nueva contrasenia no puede contener espacios en blanco*/
  static readonly KEY_CLAVE_ESPACIOS_BLANCO: string = '6';

  /** 400 - La contrasenia actual no coincide con la contrasenia del usuario autenticado*/
  static readonly KEY_CLAVE_NO_COINCIDE: string = '7';

  /** 400 - La nueva contrasenia debe ser diferente a la contrasenia actual*/
  static readonly KEY_CLAVE_ACTUAL_IGUAL: string = '8';

  /** 400 - El usuario de ingreso debe tener al menos 10 caracteres*/
  static readonly KEY_USER_INGRESO_LONGITUD_NO_PERMITIDA: string = '9';

  /** 400 - El usuario de ingreso no puede contener espacios en blanco*/
  static readonly KEY_USER_INGRESO_ESPACIOS_BLANCO: string = '10';

  /** 400 - Ya existe un campo de entrada de informacion con el mismo tipo y nombre*/
  static readonly KEY_EXISTE_CAMPO_ENTRADA: string = '11';

  /** 400 - El campo de entrada de información que intenta eliminar tiene una nomenclatura asociada*/
  static readonly KEY_DELETE_CAMPO_NOMENCLATURA_ASOCIADA: string = '12';

  /** 400 - La nomenclatura '?' ya se encuentra registrada en el sistema*/
  static readonly KEY_NOMENCLATURA_EXISTE: string = '13';

  /** 400 - La nomenclatura que intenta eliminar tiene un consecutivo asociado*/
  static readonly KEY_DELETE_NOMENCLATURA_CONSECUTIVO_ASOCIADA: string = '14';
}
