/**
 * Clase constante que contiene los mensajes personalizados
 * para las interfaces graficas, tales como mensajes de
 * confirmacion, seguridad etc
 *
 * @author Carlos Andres Diaz
 */
export class MsjFrontConstant {

  /** Titulo de EXITOSO */
  static readonly EXITOSO: string = 'Exitoso:';

  /** Titulo de ERROR */
  static readonly ERROR: string = 'Error:';

  /** Titulo de INFORMACION */
  static readonly INFORMACION: string = 'Información:';

  /** Titulo de ADVERTENCIA */
  static readonly ADVERTENCIA: string = 'Advertencia:';

  /** Titulo de CONFIRMACION */
  static readonly CONFIRMACION: string = 'Ventana de Confirmación';

  /** Titulo de ERROR - VALIDACION */
  static readonly ERROR_VALIDACION: string = 'Error de validación:';

  /** Mensaje cuando no seleccionan los modulos para el nuevo usuario */
  static readonly MODULOS_USER: string = 'Por favor seleccione los módulos que podrá acceder el nuevo usuario';

  /** Mensaje exitoso para la creacion del usuario */
  static readonly USER_CREADO: string = 'El usuario fue registrado exitosamente en el sistema y su contraseña es:';

  /** Mensaje para el cambio de estado del usuario */
  static readonly CAMBIAR_ESTADO_USER: string =
    '¿Seguro de <strong>?1</strong> el siguiente usuario? <div class="text-center mar-top"><strong>?2</strong></div>';

  /** Mensaje de confirmacion para la generacion de una nueva clave */
  static readonly GENERAR_CLAVE_CONFI: string =
    '¿Seguro de <strong>generar una nueva contraseña</strong> para? <div class="text-center mar-top"><strong>?1</strong></div>';

  /** Mensaje exitoso generacion clave para el usuario */
  static readonly GENERAR_CLAVE_EXITOSO: string = 'La nueva contraseña para el usuario <strong>?1</strong> es:<strong>?2</strong>';

  /** Mensaje cuando para alguna actualizacion del usuario */
  static readonly USUARIO_ACTUALIZADO = 'Usuario Actualizado';

  /** Mensaje de error cuando los modulos son requeridos */
  static readonly MODULOS_REQUERIDOS = 'Los módulos son requeridos';
}
