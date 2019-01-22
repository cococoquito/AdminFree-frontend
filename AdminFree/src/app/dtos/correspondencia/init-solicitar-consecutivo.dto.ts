import { NomenclaturaDTO } from './../configuraciones/nomenclatura.dto';

/**
 * Clase que contiene los datos iniciales al momento de entrar al submodulo de
 * solicitar consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
export class InitSolicitarConsecutivoDTO {

  /** Son las nomenclaturas activas a mostrar en pantalla */
  public nomenclaturas: Array<NomenclaturaDTO>;

  /**
   * Es la fecha actual del sistema, no se puede tomar directamente desde angular
   * ya que se tomaria la fecha de la maquina del cliente
   */
  public fechaActual: Date;
}
