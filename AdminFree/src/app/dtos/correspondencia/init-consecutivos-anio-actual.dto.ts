import { ConsecutivoDTO } from './consecutivo.dto';
import { SelectItemDTO } from '../transversal/select-item.dto';

/**
 * Clase que contiene los datos iniciales al momento de entrar al submodulo de
 * Consecutivos de correspondencia solicitados para el anio actual
 *
 * @author Carlos Andres Diaz
 */
export class InitConsecutivosAnioActualDTO {

  /** Lista de consecutivos que se muestra al momento de entrar al submodulo */
  public consecutivos: Array<ConsecutivoDTO>;

  /** Lista de items para mostrarlo en el componente de filtros por usuarios */
  public usuarios: Array<SelectItemDTO>;

  /**
   * Es la fecha actual del sistema, no se puede tomar directamente desde angular
   * ya que se tomaria la fecha de la maquina del cliente
   */
  public fechaActual: Date;
}
