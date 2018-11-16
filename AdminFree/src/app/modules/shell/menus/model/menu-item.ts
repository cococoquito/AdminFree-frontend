/**
 * Modelo para los items del menu de la app
 *
 * @author Carlos Andres Diaz
 */
export class MenuItem {

  /** Nombre del item */
  public nombre: string;

  /** Icono a mostrar a lado del nombre de este item */
  public icono: string;

  /** Indica si este item fue seleccionado por el user */
  public isSeleccionado: boolean;

  /** Es el router a navegar, solo aplica para items que no son modulo ni submodulo */
  public router?: string;

  /** Es el identificador del MODULO, solo aplica para items tipo modulos */
  public moduloToken?: string;

  /** Son los items de este modulo o submodulo */
  public items?: Array<MenuItem>;

  /** Indica si es el ultimo Item */
  public isUltimoItem: boolean;

  /**
   * Metodo que permite agregar un item para este modulo o submodulo
   *
   * @param item, item agregar a este modulo o submodulo
   */
  public agregarItem(item: MenuItem): void {
    if (!this.items) {
      this.items = new Array<MenuItem>();
    }
    this.items.push(item);
  }
}
