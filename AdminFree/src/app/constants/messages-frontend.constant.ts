/**
 * Clase constante que contiene los mensajes personalizados
 * para las interfaces graficas, tales como mensajes de
 * confirmacion, seguridad etc
 *
 * @author Carlos Andres Diaz
 */
export class MessagesFrontendConstant {

  /** Titulo de ERROR */
  static readonly ERROR: string = 'Error:';

  /** Titulo de EXITOSO */
  static readonly EXITOSO: string = 'Exitoso:';

  /** Titulo de CONFIRMACION */
  static readonly CONFIRMACION: string = 'Ventana Confirmación';

  /** Titulo de ERROR - VALIDACION */
  static readonly ERROR_VALIDACION: string = 'Error de validación:';

  /** Mensaje cuando no seleccionan los modulos para el nuevo usuario */
  static readonly MODULOS_USER: string = 'Por favor seleccione los módulos que podrá acceder el nuevo usuario';

  /** Mensaje exitoso para la creacion del usuario */
  static readonly USER_CREADO: string = 'El usuario fue registrado exitosamente en el sistema y su contraseña es:';

  /** Mensaje para el cambio de estado del usuario */
  static readonly CAMBIAR_ESTADO_USER: string =
    '¿Está seguro de <strong>?1</strong> el siguiente usuario? <br/><div class="text-center"><strong>?2</strong></div>';
}
