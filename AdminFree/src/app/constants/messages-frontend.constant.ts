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
    '¿Seguro de <strong>?1</strong> el siguiente usuario? <div class="text-center mt-2"><strong>?2</strong></div>';

  /** Mensaje de confirmacion para la generacion de una nueva clave */
  static readonly GENERAR_CLAVE_CONFI: string =
    '¿Seguro de <strong>generar una nueva contraseña</strong> para? <div class="text-center mt-2"><strong>?1</strong></div>';

  /** Mensaje exitoso generacion clave para el usuario */
  static readonly GENERAR_CLAVE_EXITOSO: string = 'La nueva contraseña para el usuario <strong>?1</strong> es:<strong>?2</strong>';

  /** Mensaje cuando para alguna actualizacion del usuario */
  static readonly USUARIO_ACTUALIZADO = 'Usuario Actualizado';

  /** Mensaje de error cuando los modulos son requeridos */
  static readonly MODULOS_REQUERIDOS = 'Los módulos son requeridos';

  /** Mensaje cuando el administrador intenta ingresar a una funcionalidad que no aplica */
  static readonly ADMIN_NO_APLICA = 'Esta funcionalidad no aplica para el <strong>Administrador</strong>';

  /** Mensaje cuando los datos de la cuenta fue actuazalida */
  static readonly DATOS_CUENTA_ACTUALIZADO = 'Datos de la cuenta actualizado';

  /** Mensaje cuando la clave de ingreso fue actuazalida */
  static readonly CLAVE_INGRESO_ACTUALIZADO = 'Contraseña Modificada';

  /** Mensaje para el cambio de los datos de la cuenta */
  static readonly CAMBIAR_DATOS_CUENTA_USER: string = '¿Está seguro de modificar los <strong>datos de la cuenta</strong>?';

  /** Mensaje para el cambio de la contrasenia */
  static readonly CAMBIAR_CLAVE_INGRESO: string = '¿Está seguro de cambiar la <strong>Contraseña</strong>?';

  /** Mensaje para la eliminacion de un campo de entrada */
  static readonly ELIMINAR_CAMPO_ENTRADA: string =
    '¿Está seguro de eliminar el siguiente campo? <div class="text-center mt-2"><strong>?1</strong></div>';

  /** Mensaje cuando el campo fue eliminado exitosamente */
  static readonly CAMPO_ENTRADA_ELIMINADO: string = 'El campo fue eliminado';

  /** Mensaje el tipo de campo es requerido */
  static readonly TIPO_CAMPO_REQUERIDO: string = 'Seleccione el tipo de campo';

  /** Mensaje cuando se registra un nuevo campo en el sistema */
  static readonly CAMPO_CREADO_EXITOSO: string = 'Campo creado exitosamente';

  /** Mensaje cuando se modifica un campo en el sistema */
  static readonly CAMPO_ACTUALIZADO_EXITOSO: string = 'Campo modificado exitosamente';

  /** Mensaje cuando se modifica un usuario en el sistema */
  static readonly USER_ACTUALIZADO_EXITOSO: string = 'Usuario modificado exitosamente';

  /** Mensaje el tipo de campo es requerido */
  static readonly ITEMS_REQUERIDO: string = 'Los ítems son requeridos';

  /** Mensaje cuando quieren salir de una pagina de creacion o edicion */
  static readonly SEGURO_SALIR: string = '¿Está seguro que desea salir?';

  /** Mensaje cuando quieren salir sin aplicar cambios*/
  static readonly SEGURO_SALIR_EDICION: string = '¿Seguro que desea salir sin aplicar los cambios?';

  /** Mensaje cuando el campo tiene un consecutivo asociado */
  static readonly CAMPO_CON_CONSECUTIVO: string = 'Existen <strong>consecutivos de correspondencia</strong> asociados a este campo';

  /** Mensaje cuando el campo tiene un nomenclaturas asociado */
  static readonly CAMPO_CON_NOMENCLATURAS: string = 'Existen <strong>nomenclaturas</strong> asociados a este campo';

  /** Mensaje cuando la nomenclatura fue eliminado exitosamente */
  static readonly NOMENCLATURA_ELIMINADO: string = 'La nomenclatura fue eliminada';

  /** Mensaje para la eliminacion de una nomenclatura */
  static readonly ELIMINAR_NOMENCLATURA: string =
    '¿Está seguro de eliminar la siguiente nomenclatura? <div class="text-center mt-2"><strong>?1</strong></div>';

  /** Mensaje cuando se registra una nueva nomeclatura */
  static readonly NOMENCLATURA_CREADA_EXITOSO: string = 'Nomenclatura Creada';

  /** Mensaje cuando la nomenclatura tiene un consecutivo asociado */
  static readonly NOMENCLATURA_CON_CONSECUTIVO: string =
    'Existen <strong>consecutivos de correspondencia</strong> asociados a esta nomenclatura';
}
