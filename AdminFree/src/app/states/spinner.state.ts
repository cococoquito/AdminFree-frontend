import { Injectable } from '@angular/core';

/**
 * Es el estado en la que se encuentra el Spinner
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class SpinnerState {

  /** bandera que indica si se debe visualizar el spinner **/
  public display: boolean;

  /**
   * Constructor del spinner que inicializa la bandera
   */
  constructor() {
    this.display = false;
  }

  /**
   * Metodo que permite visualizar el spinner
   */
  public displaySpinner(): void {
    this.display = true;
  }

  /**
   * Metodo que permite ocultar el spinner
   */
  public hideSpinner(): void {
    this.display = false;
  }
}
