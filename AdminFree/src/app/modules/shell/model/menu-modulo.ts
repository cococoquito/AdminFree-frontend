import { MenuModuloItem } from './menu-modulo-item';

/**
 * Es el modulo a visualizar en el Menu
 *
 * @author Carlos Andres Diaz
 */
export class MenuModulo {

  /** Es el nombre del modulo */
  public nombre: string;

  /** Token que identifica el modulo */
  public token: string;

  /** Icono del item a visualizar en el menu */
  public icono: string;

  /** Son los items de este modulo */
  public items: Array<MenuModuloItem>;

  /** bandera que indica si el modulo es seleccionado */
  public isSeleccionado: boolean;
}
