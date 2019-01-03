/**
 * Clase constante que contiene todas las etiquetas tales como
 * titulos del menu, label para botones, items del menu etc
 *
 * @author Carlos Andres Diaz
 */
export class LabelsConstant {

  /** Titulo para el componente Administracion de usuarios*/
  public static readonly TITLE_ADMIN_USERS: string = 'Administración de Usuarios';

  /** Titulo para el componente Administracion de campos*/
  public static readonly TITLE_ADMIN_CAMPOS: string = 'Administración de Campos';

  /** Titulo para el componente Administracion de nomenclaturas*/
  public static readonly TITLE_ADMIN_NOMENCLATURAS: string = 'Administración de Nomenclaturas';

  /** Sub - Titulo para la pagina de administracion de usuario*/
  public static readonly SUBTITLE_ADMIN_USER: string =
    'Submódulo administrativo para las configuraciones de los <strong>usuarios del sistema</strong>';

  /** Sub - Titulo para la pagina de administracion la cuenta user*/
  public static readonly SUBTITLE_ADMIN_CUENTA_USER: string =
    'Submódulo de seguridad para modificar la <strong>cuenta de usuario</strong>';

  /** Sub - Titulo para la pagina de administracion de campos*/
  public static readonly SUBTITLE_ADMIN_CAMPOS: string =
    'Submódulo administrativo para las configuraciones de los <strong>campos de entrada de información</strong>';

  /** Sub - Titulo para la pagina de administracion de nomenclaturas*/
  public static readonly SUBTITLE_ADMIN_NOMENCLATURAS: string =
    'Submódulo administrativo para las configuraciones de las <strong>nomenclaturas del sistema</strong>';

  /** Titulo para el modulo de correspondencia*/
  public static readonly MODULO_CORRESPONDENCIA: string = 'Correspondencia';

  /** Titulo para el modulo de archivo de gestion*/
  public static readonly MODULO_ARCHIVO_GESTION: string = 'Archivo de Gestión';

  /** Titulo para el modulo de reportes*/
  public static readonly MODULO_REPORTES: string = 'Reportes';

  /** Titulo para el modulo de configuraciones*/
  public static readonly MODULO_CONFIGURACIONES: string = 'Configuraciones';

  /** Titulo pagina de inicio para el menu*/
  public static readonly MENU_PAGINA_INICIO: string = 'Página de Inicio';

  /** Titulo configuracion de cuenta para el menu*/
  public static readonly MENU_CUENTA_USER: string = 'Configuración de Cuenta';

  /** Titulo Administracion de usuarios para el menu*/
  public static readonly MENU_ADMIN_USERS: string = 'Usuarios';

  /** Titulo Administracion de campos para el menu*/
  public static readonly MENU_ADMIN_CAMPOS: string = 'Campos';

  /** Titulo Administracion de nomenclaturas para el menu*/
  public static readonly MENU_ADMIN_NOMENCLATURAS: string = 'Nomenclaturas';

  /** Label cerrar sesion*/
  public static readonly CERRAR_SESION: string = 'Cerrar Sesión';

  /** Es el KEY para identificar el componente mensajes debajo del titulo */
  public static readonly KEY_MESSAGE: string = 'msj';

  /** Es el KEY para identificar el componente mensajes debajo del titulo informativo */
  public static readonly KEY_MESSAGE_INFO: string = 'inf';

  /** Es el KEY para identificar el componente tipo TOAST */
  public static readonly KEY_TOAST: string = 'toast';

  /** Son los tipos de severity */
  public static readonly SUCCESS: string = 'success';
  public static readonly INFO: string = 'info';
  public static readonly WARN: string = 'warn';
  public static readonly ERROR: string = 'error';

  /** labels para la administracion de los campos de entrada */
  public static readonly DATOS_CAMPO: string = 'Datos del Campo';
  public static readonly RESTRICCIONES: string = 'Restricciones';
  public static readonly AGREGAR_ITEMS: string = 'Agregar Ítems';
  public static readonly CONFIRMACION: string = 'Confirmación';

  /** labels para la administracion de los usuarios */
  public static readonly DATOS_USER: string = 'Datos del Usuario';
  public static readonly MODULOS: string = 'Módulos';
}
