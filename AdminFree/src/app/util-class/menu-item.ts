/**
 * Clase que representa el item para el Menu de la aplicacion
 *
 * @author Carlos Andres Diaz
 */
export class MenuItem {

  /** Es el texto del item a mostrar en el menu**/
  public text: string;

  /** Es el icono relacionado al item**/
  public icon: string;

  /** Route que redirecciona el item, si aplica**/
  public route: string;

  /** Es el submenu para este item, si aplica**/
  public submenu: Array<MenuItem>;
}
