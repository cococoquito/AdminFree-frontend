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
  static readonly USER_CREADO: string = 'El usuario <strong>?1</strong> fue registrado exitosamente en el sistema y su clave es:';

  /** Mensaje para el cambio de estado del usuario */
  static readonly CAMBIAR_ESTADO_USER: string =
    '¿Seguro de <strong>?1</strong> el siguiente usuario? <div class="text-center mt-2"><strong>?2</strong></div>';

  /** Mensaje de confirmacion para la generacion de una nueva clave */
  static readonly GENERAR_CLAVE_CONFI: string =
    '¿Seguro de <strong>generar una nueva contraseña</strong> para? <div class="text-center mt-2"><strong>?1</strong></div>';

  /** Mensaje exitoso generacion clave para el usuario */
  static readonly GENERAR_CLAVE_EXITOSO: string = 'La nueva contraseña para el usuario <strong>?1</strong> es:';

  /** Mensaje cuando para alguna actualizacion del usuario */
  static readonly USUARIO_ACTUALIZADO = 'Usuario Actualizado';

  /** Mensaje de error cuando los modulos son requeridos */
  static readonly MODULOS_REQUERIDOS = 'Los módulos son requeridos';

  /** Mensaje cuando el administrador intenta ingresar a una funcionalidad que no aplica */
  static readonly ADMIN_NO_APLICA = 'Esta funcionalidad no aplica para el <strong>Administrador</strong>';

  /** Mensaje cuando los datos personales fueron modificados */
  static readonly DATOS_PERSONALES_MODIFICADOS = 'Datos Personales Modificado';

  /** Mensaje cuando la clave de ingreso fue modificada */
  static readonly CLAVE_INGRESO_ACTUALIZADO = 'Contraseña Modificada';

  /** Mensaje cuando el usuario de ingreso fue modificada */
  static readonly USUARIO_INGRESO_ACTUALIZADO = 'Usuario de Ingreso Modificado';

  /** Mensaje para el cambio de la contrasenia */
  static readonly CAMBIAR_CLAVE_INGRESO: string = '¿Está seguro de cambiar tu <strong>contraseña</strong>?';

  /** Mensaje para el cambio del usuario de ingreso */
  static readonly CAMBIAR_USER_INGRESO: string = '¿Está seguro de cambiar tu <strong>usuario de ingreso</strong>?';

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

  /** Mensaje cuando se modifica una nomenclatura */
  static readonly NOMENCLATURA_ACTUALIZADO_EXITOSO: string = 'Nomenclatura Modificado';

  /** mayor que la fecha actual */
  static readonly FECHA_MAYOR_ACTUAL: string = ' debe ser MAYOR que la fecha actual';

  /** menor que la fecha actual */
  static readonly FECHA_MENOR_ACTUAL: string = ' debe ser MENOR que la fecha actual';

  /** mayor o igual que la fecha actual */
  static readonly FECHA_MAYOR_IGUAL_ACTUAL: string = ' debe ser MAYOR o IGUAL que la fecha actual';

  /** menor o igual que la fecha actual */
  static readonly FECHA_MENOR_IGUAL_ACTUAL: string = ' debe ser MENOR o IGUAL que la fecha actual';

  /** Mensaje cuando se registra un documento */
  static readonly DOCUMENTO_CARGADO: string = 'El documento fue registrado exitosamente en el sistema';

  /** Mensaje cuando se elimina un documento */
  static readonly DOCUMENTO_ELIMINADO: string = 'El documento fue eliminado';

  /** Mensaje de confirmacion para la eliminacion de un documento */
  static readonly DOCUMENTO_ELIMINAR_CONFIRMACION: string =
  '¿Está seguro de eliminar el siguiente documento? <div class="text-center mt-2"><strong>?1</strong></div>';

  /** Mensaje cuando la fecha inicial solictud es mayor que la fecha final */
  static readonly FECHA_INICIAL_MAYOR: string = 'La fecha inicial debe ser menor que la fecha final';

  /** Mensaje de confirmacion para anular o activar un consecutivo*/
  static readonly CONFIRMAR_ACTIVAR_ANULAR_CONSECUTIVO: string =
  '¿Está seguro de <strong>?1</strong> el siguiente consecutivo? <div class="text-center mt-2"><strong>?2</strong><span ?3>?4</span></div>';

  /** Mensaje cuando el estado del consecutivo fue actualizado exitosamente */
  static readonly ESTADO_CONSECUTIVO_ACTUALIZADO: string = 'El estado del consecutivo fue actualizado exitosamente';

  /** Mensaje cuando el consecutivo es cedido exitosamente */
  static readonly CONSECUTIVO_CEDIDO: string = 'El consecutivo fue cedido exitosamente';

  /** Mensaje cuando la informacion del consecutivo fue actualizado */
  static readonly VALORES_CONSECUTIVO_ACTUALIZADO: string = 'La información del consecutivo fue actualizada exitosamente';

  /** Mensaje cuando el consecutivo es generado exitosamente */
  static readonly CONSECUTIVO_GENERADO: string = 'Consecutivo generado exitosamente';

  /** Mensaje para la eliminacion de una subserie o serie documental */
  static readonly ELIMINAR_SERIE_SUBSERIE: string =
    '¿Seguro de eliminar la siguiente ?1 documental? <div class="text-center mt-2 ?3"><strong>?2</strong></div>';

  /** Mensaje cuando la serie/subserie documental fue eliminada exitosamente */
  static readonly SERIE_SUBSERIE_ELIMINADA: string = 'La ?1 documental fue eliminada';

  /** Mensaje cuando se presenta algun error en los campos para crear/editar serie/subserie */
  static readonly ADMIN_SERIES_ERROR_CAMPOS: string = 'Se presentaron errores en algunos campos, por favor verifique';

  /** Mensaje de confirmacion para la creacion de una serie o subserie */
  static readonly CREAR_SERIE_SUBSERIE: string = '¿Está seguro de proceder a crear la ?1 documental?';

  /** Mensaje cuando la serie/subserie documental fue creada exitosamente */
  static readonly SERIE_SUBSERIE_CREADA: string = 'La ?1 documental fue creada exitosamente en el sistema';
}
