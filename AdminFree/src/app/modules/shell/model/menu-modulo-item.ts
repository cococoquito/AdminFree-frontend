/**
 * Son los items de un modulo a visualizar en el menu
 *
 * @author Carlos Andres Diaz
 */
export class MenuModuloItem {

  /** Es el nombre del item a visualizar en el menu */
  public nombre: string;

  /** Es el router a redireccionar cuando dan click en el item */
  public router: string;

  /** Icono del item a visualizar en el menu */
  public icono: string;

  /** bandera que indica si el item es seleccionado */
  public isSeleccionado: boolean;
}
