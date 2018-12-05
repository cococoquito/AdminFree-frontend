/**
 * Clase constante que contiene todas las etiquetas tales como
 * titulos del menu, label para botones, items del menu etc
 *
 * @author Carlos Andres Diaz
 */
export class LabelsConstant {

  /** Sub - Titulo para la pagina de administracion de usuario*/
  public static readonly SUBTITLE_ADMIN_USER: string =
    'Submódulo administrativo para las configuraciones de los <strong>usuarios del sistema</strong>';

  /** Sub - Titulo para la pagina de administracion la cuenta user*/
  public static readonly SUBTITLE_ADMIN_CUENTA_USER: string =
    'Submódulo de seguridad para las modificaciones de la <strong>cuenta del usuario</strong>';

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
  public static readonly MENU_ADMIN_USERS: string = 'Administración de Usuarios';

  /** Label cerrar sesion*/
  public static readonly CERRAR_SESION: string = 'Cerrar Sesión';

  /** Es el KEY para identificar el componente mensajes debajo del titulo */
  public static readonly KEY_MESSAGE: string = 'msj';

  /** Es el KEY para identificar el componente tipo TOAST */
  public static readonly KEY_TOAST: string = 'toast';

  /** Son los tipos de severity */
  public static readonly SUCCESS: string = 'success';
  public static readonly INFO: string = 'info';
  public static readonly WARN: string = 'warn';
  public static readonly ERROR: string = 'error';
}
