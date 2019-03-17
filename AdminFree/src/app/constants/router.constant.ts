/**
 * Clase constante que contiene todo los ROUTER de ADMINFREE
 *
 * @author Carlos Andres Diaz
 */
export class RouterConstant {

  /** Nombre del Router para el modulo del CLIENTES */
  public static readonly ROUTER_CLIENTES: string = 'zaqwsx';

  /** Nombre del Router para el modulo del LOGIN */
  public static readonly ROUTER_LOGIN: string = 'login';

  /** Nombre del Router para el modulo del PAGINAS DE ERRORES */
  public static readonly ROUTER_ERROR: string = 'error';

  /** Nombre del Router para la pagina de error cuando el usuario no tiene permisos*/
  public static readonly ROUTER_DENEGADO: string = 'denegado';

  /** Nombre del Router que se utiliza cuando el user esta autenticado*/
  public static readonly ROUTER_AUTENTICADO: string = 'autenticado';

  /** Nombre del Router para la pagina BIENVENIDA*/
  public static readonly ROUTER_BIENVENIDA: string = 'bienvenida';

  /** Nombre del Router para la pagina de admin cuenta del user*/
  public static readonly ROUTER_CUENTA_USER: string = 'cuentauser';

  /** Nombre del Router del modulo de ARCHIVO_GESTION*/
  public static readonly ROUTER_ARCHIVO_GESTION: string = 'archivogestion';

  /** Nombre del Router del modulo de CORRESPONDENCIA*/
  public static readonly ROUTER_CORRESPONDENCIA: string = 'correspondencia';

  /** Nombre del Router del modulo de REPORTES*/
  public static readonly ROUTER_REPORTES: string = 'reportes';

  /** Nombre del Router del modulo de CONFIGURACIONES*/
  public static readonly ROUTER_CONFIGURACIONES: string = 'configuraciones';

  /** Nombre del Router del ITEM administracion de usuarios*/
  public static readonly ROUTER_ADMIN_USERS: string = 'adminusers';

  /** Nombre del Router del ITEM administracion de campos*/
  public static readonly ROUTER_ADMIN_CAMPOS: string = 'admincampos';

  /** Nombre del Router del ITEM administracion de Nomenclaturas*/
  public static readonly ROUTER_ADMIN_NOMENCLATURAS: string = 'adminnomen';

  /** Nombre del Router del ITEM Solicitar consecutivos*/
  public static readonly ROUTER_SOLICITAR_CONSECUTIVOS: string = 'solicitarconse';

  /** Nombre del Router del ITEM Consecutivos Solicitados*/
  public static readonly ROUTER_CONSECUTIVOS_SOLICITADOS: string = 'consesolicitados';

  /** Nombre del Router del ITEM Mis Consecutivos Solicitados*/
  public static readonly ROUTER_MIS_CONSECUTIVOS_SOLICITADOS: string = 'misconsesolicitados';

  /** Constante para navegar al modulo de CLIENTES */
  public static readonly NAVIGATE_CLIENTES: string = `/${RouterConstant.ROUTER_CLIENTES}`;

  /** Constante para navegar al modulo de LOGIN */
  public static readonly NAVIGATE_LOGIN: string = `/${RouterConstant.ROUTER_LOGIN}`;

  /** Constante para navegar a la pagina de PERMISOS DENEGADO */
  public static readonly NAVIGATE_DENEGADO: string = `/${RouterConstant.ROUTER_ERROR}/${RouterConstant.ROUTER_DENEGADO}`;

  /** Constante para navegar a la pagina de BIENVENIDA */
  public static readonly NAVIGATE_BIENVENIDA: string = `/${RouterConstant.ROUTER_AUTENTICADO}/${RouterConstant.ROUTER_BIENVENIDA}`;

  /** Constante para navegar a la pagina de ADMIN CUENTA USER */
  public static readonly NAVIGATE_CUENTA_USER: string = `/${RouterConstant.ROUTER_AUTENTICADO}/${RouterConstant.ROUTER_CUENTA_USER}`;

  /** Constante para navegar a la pagina de ADMIN USERS */
  public static readonly NAVIGATE_ADMIN_USERS: string =
    `/${RouterConstant.ROUTER_AUTENTICADO}/${RouterConstant.ROUTER_CONFIGURACIONES}/${RouterConstant.ROUTER_ADMIN_USERS}`;

  /** Constante para navegar a la pagina de ADMIN CAMPOS */
  public static readonly NAVIGATE_ADMIN_CAMPOS: string =
    `/${RouterConstant.ROUTER_AUTENTICADO}/${RouterConstant.ROUTER_CONFIGURACIONES}/${RouterConstant.ROUTER_ADMIN_CAMPOS}`;

  /** Constante para navegar a la pagina de ADMIN NOMENCLATURAS */
  public static readonly NAVIGATE_ADMIN_NOMENCLATURAS: string =
    `/${RouterConstant.ROUTER_AUTENTICADO}/${RouterConstant.ROUTER_CONFIGURACIONES}/${RouterConstant.ROUTER_ADMIN_NOMENCLATURAS}`;

  /** Constante para navegar a la pagina de SOLICITAR CONSECUTIVOS */
  public static readonly NAVIGATE_SOLICITAR_CONSECUTIVOS: string =
    `/${RouterConstant.ROUTER_AUTENTICADO}/${RouterConstant.ROUTER_CORRESPONDENCIA}/${RouterConstant.ROUTER_SOLICITAR_CONSECUTIVOS}`;

  /** Constante para navegar a la pagina de CONSECUTIVOS SOLICITADOS */
  public static readonly NAVIGATE_CONSECUTIVOS_SOLICITADOS: string =
    `/${RouterConstant.ROUTER_AUTENTICADO}/${RouterConstant.ROUTER_CORRESPONDENCIA}/${RouterConstant.ROUTER_CONSECUTIVOS_SOLICITADOS}`;

  /** Constante para navegar a la pagina de MIS CONSECUTIVOS SOLICITADOS */
  public static readonly NAVIGATE_MIS_CONSECUTIVOS_SOLICITADOS: string =
    `/${RouterConstant.ROUTER_AUTENTICADO}/${RouterConstant.ROUTER_CORRESPONDENCIA}/${RouterConstant.ROUTER_MIS_CONSECUTIVOS_SOLICITADOS}`;
}
