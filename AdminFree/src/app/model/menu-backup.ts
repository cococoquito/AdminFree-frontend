import { MenuItem } from './menu-item';

/**
 * Se utiliza para hacer el backup del menu en el local-store,
 * cuando el usuario destruye la aplicacion sin cerrar sesion
 *
 * @author Carlos Andres Diaz
 */
export class MenuBackup {

  /** Se utiliza para mostrar/ocultar el menu **/
  public isMenuOpen = false;

  /** Indica si el toogle del menu se visualiza por primera vez **/
  public isToogleMenuFirstTime = true;

  /** Indica si el menu se visualiza por primera vez **/
  public isMenuShowFirstTime = true;

  /** Son los modulos a visualizar en el menu **/
  public modulos: Array<MenuItem>;
}
