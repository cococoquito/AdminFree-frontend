/**
 * Clase constante que contiene todo los ROUTER de ADMINFREE
 *
 * @author Carlos Andres Diaz
 */
export class RouterConstant {

  /** Router para navegar al modulo del CLIENTES*/
  public static readonly CLIENTES: string = 'zaqwsx';

  /** Router para navegar al modulo del LOGIN*/
  public static readonly LOGIN: string = 'login';

  /** Router para navegar a la pagina BIENVENIDA*/
  public static readonly BIENVENIDA: string = 'bienvenida';

  /** Router principal del modulo de archivo-gestion*/
  public static readonly ARCHIVO_GESTION: string = 'archivogestion';

  /** Router principal del modulo de correpondencia*/
  public static readonly CORRESPONDENCIA: string = 'correspondencia';

  /** Router para la pagina de error cuando el usuario no tiene permisos*/
  public static readonly DENEGADO: string = 'denegado';

  /** Router para la pagina de error cuando la pagina no existe*/
  public static readonly ERROR: string = 'error';
}
