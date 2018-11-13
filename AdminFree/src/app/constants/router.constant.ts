/**
 * Clase constante que contiene todo los ROUTER de ADMINFREE
 *
 * @author Carlos Andres Diaz
 */
export class RouterConstant {

  /** Router para navegar al modulo del CLIENTES*/
  public static readonly CLIENTES: string = 'zaqwsx';

  /** Es el router completo de clientes*/
  public static readonly CLIENTES_ROUTER: string = '/' + RouterConstant.CLIENTES;

  /** Router para navegar al modulo del LOGIN*/
  public static readonly LOGIN: string = 'login';

  /** Router para navegar a la pagina BIENVENIDA*/
  public static readonly BIENVENIDA: string = 'bienvenida';

  /** Router principal del modulo de archivo-gestion*/
  public static readonly ARCHIVO_GESTION: string = 'archivogestion';

  /** Router principal del modulo de correpondencia*/
  public static readonly CORRESPONDENCIA: string = 'correspondencia';

  /** Router principal del modulo de reportes*/
  public static readonly REPORTES: string = 'reportes';

  /** Router principal del modulo de configuraciones*/
  public static readonly CONFIGURACIONES: string = 'configuraciones';

  /** Router principal del modulo de cuenta-user*/
  public static readonly ADMIN_CUENTA_USER: string = 'admincuentauser';

  /** Router para la pagina de error cuando el usuario no tiene permisos*/
  public static readonly DENEGADO: string = 'denegado';

  /** Router para la pagina de error cuando la pagina no existe*/
  public static readonly ERROR: string = 'error';

  /** Router para la pagina de error cuando el usuario no tiene permisos*/
  public static readonly ERROR_DENEGADO: string = RouterConstant.ERROR + '/' + RouterConstant.DENEGADO;
}
