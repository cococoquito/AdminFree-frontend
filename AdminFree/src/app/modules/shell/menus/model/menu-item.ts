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

  /** Indica si este item es de la pagina de inicio */
  public isPaginaInicio: boolean;

  /** Indica si los items se debe visualizar en el menu */
  public isOpen: boolean;

  /** Es el router a navegar, solo aplica para items que no son modulo ni submodulo */
  public router?: string;

  /** Es el identificador del MODULO, solo aplica para items tipo modulos */
  public moduloToken?: string;

  /** Se utiliza para el estilo del menu */
  public isUltimoItem: boolean;

  /** Son los items de este modulo o submodulo */
  public items?: Array<MenuItem>;

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
