/**
 * Modelo para seleccionar los modulos que podra ver el usuario
 *
 * @author Carlos Andres Diaz
 */
export class ModulosCheck {

  /** indica si el usuario tiene acceso al modulo configuraciones */
  public configuraciones: boolean;

  /** indica si el usuario tiene acceso al modulo correspondencia */
  public correspondencia: boolean;

  /** indica si el usuario tiene acceso al modulo archivo gestion */
  public archivoGestion: boolean;

  /** indica si el usuario tiene acceso al modulo reportes */
  public reportes: boolean;

  constructor() {
    this.configuraciones = false;
    this.correspondencia = false;
    this.archivoGestion = false;
    this.reportes = false;
  }

  /**
   * Indica si selecionaron almenos un modulo
   */
  public tieneModuloSeleccionado(): boolean {
    if (this.configuraciones ||
        this.correspondencia ||
        this.archivoGestion  ||
        this.reportes) {
      return true;
    }
    return false;
  }
}
