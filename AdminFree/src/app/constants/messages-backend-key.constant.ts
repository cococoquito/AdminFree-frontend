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

  /** 400 - El consecutivo ? ya tiene asociado un documento con el nombre ?*/
  static readonly KEY_CONSECUTIVO_DOCUMENTO_MISMO_NOMBRE: string = '15';

  /** 400 - El documento que intenta cargar se encuentra vacio*/
  static readonly KEY_DOCUMENTO_VACIO: string = '16';

  /** 400 - El documento que intenta descargar no existe en el sistema*/
  static readonly KEY_DOCUMENTO_NO_EXISTE: string = '17';

  /** 400 - El nuevo estado no es permitido para el consecutivo, debe ser ACTIVO o ANULADO*/
  static readonly KEY_ESTADO_NO_PERMITIDO: string = '18';

  /** 400 - EL proceso no se ejecutó satisfactoriamente, por favor inténtalo de nuevo*/
  static readonly KEY_PROCESO_NO_EJECUTADO: string = '19';

  /** 400 - EL tipo documental que intenta eliminar se encuentra asociado a una serie o subserie documental*/
  static readonly KEY_ELIMINAR_TIPO_DOCUMENTAL: string = '20';

  /** 400 - Ya existe una serie documental con el nombre ?*/
  static readonly KEY_SERIE_MISMO_NOMBRE: string = '21';

  /** 400 - Ya existe una serie documental con el codigo ?*/
  static readonly KEY_SERIE_MISMO_CODIGO: string = '22';

  /** 400 - La serie documental que intenta eliminar tiene asociado consecutivos de correspondencia*/
  static readonly KEY_SERIE_CONSECUTIVOS: string = '23';

  /** 400 - La serie documental que intenta eliminar esta asociado en la TRD*/
  static readonly KEY_SERIE_TRD: string = '24';

  /** 400 - Para eliminar la serie documental debe eliminar primero las subseries relacionadas*/
  static readonly KEY_SERIE_TIENE_SUBSERIE: string = '25';

  /** 400 - Ya existe una subserie documental con el nombre ?*/
  static readonly KEY_SUBSERIE_MISMO_NOMBRE: string = '26';

  /** 400 - Ya existe una subserie documental con el codigo ?*/
  static readonly KEY_SUBSERIE_MISMO_CODIGO: string = '27';

  /** 400 - La subserie documental que intenta eliminar tiene asociado consecutivos de correspondencia*/
  static readonly KEY_SUBSERIE_CONSECUTIVOS: string = '28';

  /** 400 - La subserie documental que intenta eliminar esta asociado en la TRD*/
  static readonly KEY_SUBSERIE_TRD: string = '29';

  /** 400 - Ya existe un tipo documental con el nombre ?*/
  static readonly KEY_EXISTE_NOMBRE_TIPODOCUMENTAL: string = '30';
}
