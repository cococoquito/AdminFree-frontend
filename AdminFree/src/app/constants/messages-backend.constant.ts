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
    'Se presentó un error interno en el servidor ';

  /** El valor del 'Usuario de Ingreso' ya se encuentra asociado a otro usuario */
  static readonly USUARIO_INGRESO_EXISTE: string =
    'El valor del <strong>usuario de ingreso</strong> ya se encuentra asociado a otro usuario';

  /** La contrasenia de verificación no coincide*/
  static readonly CLAVE_VERIFICACION_NO_COINCIDE: string =
    'La contraseña de verificación no coincide';

  /** La nueva contrasenia debe tener al menos 12 caracteres */
  static readonly CLAVE_LONGITUD_NO_PERMITIDA: string =
    'La <strong>contraseña nueva</strong> debe tener al menos <strong>12</strong> caracteres';

  /** La nueva contrasenia no puede contener espacios en blanco */
  static readonly CLAVE_ESPACIOS_BLANCO: string =
    'La <strong>contraseña nueva</strong> no puede contener espacios en blanco';

  /** La contrasenia actual no coincide con la contrasenia del usuario autenticado */
  static readonly CLAVE_NO_COINCIDE: string =
    'La <strong>contraseña actual</strong> no coincide con la contraseña del usuario autenticado';

  /** La nueva contrasenia debe ser diferente a la contrasenia actual */
  static readonly CLAVE_ACTUAL_IGUAL: string =
    'La <strong>contraseña nueva</strong> debe ser diferente a la contraseña actual';

  /** El usuario de ingreso debe tener al menos 10 caracteres */
  static readonly USER_INGRESO_LONGITUD_NO_PERMITIDA: string =
    'El <strong>usuario de ingreso</strong> debe tener al menos <strong>10</strong> caracteres';

  /** El usuario de ingreso no puede contener espacios en blanco */
  static readonly USER_INGRESO_ESPACIOS_BLANCO: string =
    'El <strong>usuario de ingreso</strong> no puede contener espacios en blanco';

  /** Ya existe un campo de entrada de informacion con el mismo tipo y nombre*/
  static readonly EXISTE_CAMPO_ENTRADA: string =
    'Ya existe un campo de entrada de información con el mismo <strong>tipo y nombre</strong>';

  /** El campo de entrada de información que intenta eliminar tiene una nomenclatura asociada*/
  static readonly DELETE_CAMPO_NOMENCLATURA_ASOCIADA: string =
    'El campo de entrada de información que intenta eliminar <strong>tiene una nomenclatura asociada</strong>';

  /** La nomenclatura ? ya se encuentra registrada en el sistema*/
  static readonly NOMENCLATURA_EXISTE: string = 'La nomenclatura <strong>?</strong> ya se encuentra registrada en el sistema';

  /** La nomenclatura que intenta eliminar tiene un consecutivo asociado*/
  static readonly DELETE_NOMENCLATURA_CONSECUTIVO_ASOCIADA: string =
    'La nomenclatura que intenta eliminar tiene <strong>consecutivos de correspondencia asociados</strong>';

  /** El consecutivo ? ya tiene asociado un documento con el nombre ?*/
  static readonly CONSECUTIVO_DOCUMENTO_MISMO_NOMBRE: string =
    'El consecutivo <strong>?1</strong> ya tiene asociado un documento con el nombre <strong>?2</strong>';

  /** El documento que intenta cargar se encuentra vacio*/
  static readonly DOCUMENTO_VACIO: string = 'El documento que intenta cargar se encuentra vacío';

  /** El documento que intenta descargar no existe en el sistema*/
  static readonly DOCUMENTO_NO_EXISTE: string = 'El documento que intenta descargar no existe en el sistema';

  /** El nuevo estado no es permitido para el consecutivo, debe ser ACTIVO o ANULADO*/
  static readonly ESTADO_NO_PERMITIDO: string =
  'El nuevo estado no es permitido para el consecutivo, debe ser <strong>ACTIVO o ANULADO</strong>';

  /** EL proceso no se ejecutó satisfactoriamente, por favor inténtalo de nuevo*/
  static readonly PROCESO_NO_EJECUTADO: string = 'EL proceso no se ejecutó satisfactoriamente, por favor inténtalo de nuevo';

  /** EL tipo documental que intenta eliminar se encuentra asociado a una serie o subserie documental*/
  static readonly ELIMINAR_TIPO_DOCUMENTAL: string =
  'El tipo documental que intenta eliminar se encuentra asociado a una serie o subserie documental';

  /** Ya existe una serie documental con el nombre ?*/
  static readonly SERIE_MISMO_NOMBRE: string = 'Ya existe una serie documental con el nombre';

  /** Ya existe una serie documental con el codigo ?*/
  static readonly SERIE_MISMO_CODIGO: string = 'Ya existe una serie documental con el código';

  /** La serie documental que intenta eliminar tiene asociado consecutivos de correspondencia*/
  static readonly SERIE_CONSECUTIVOS: string = 'La serie tiene asociado consecutivos de correspondencia';

  /** La serie documental que intenta eliminar esta asociado en la TRD*/
  static readonly SERIE_TRD: string = 'La serie a eliminar esta asociada en la TRD';

  /** Para eliminar la serie documental debe eliminar primero las subseries relacionadas*/
  static readonly SERIE_TIENE_SUBSERIE: string = 'Para eliminar la serie debe eliminar primero las subseries';

  /** Ya existe una subserie documental con el nombre ?*/
  static readonly SUBSERIE_MISMO_NOMBRE: string = 'Ya existe una subserie documental con el nombre';

  /** Ya existe una subserie documental con el codigo ?*/
  static readonly SUBSERIE_MISMO_CODIGO: string = 'Ya existe una subserie documental con el código';

  /** La subserie documental que intenta eliminar tiene asociado consecutivos de correspondencia*/
  static readonly SUBSERIE_CONSECUTIVOS: string = 'La subserie tiene asociado consecutivos de correspondencia';

  /** La subserie documental que intenta eliminar esta asociado en la TRD*/
  static readonly SUBSERIE_TRD: string = 'La subserie a eliminar esta asociada en la TRD';

  /** Ya existe un tipo documental con el nombre ?*/
  static readonly EXISTE_NOMBRE_TIPODOCUMENTAL: string = 'Ya existe un tipo documental con el nombre ?';
}
