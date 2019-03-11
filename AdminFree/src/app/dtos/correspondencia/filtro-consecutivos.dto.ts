import { PaginadorDTO } from '../transversal/paginador-dto';
import { CampoFiltroDTO } from './campo-filtro.dto';

/**
 * DTO que contiene los atributos para los filtros de busqueda
 * de los consecutivos de correspondencia en el sistema
 *
 * @author Carlos Andres Diaz
 */
export class FiltroConsecutivosDTO {

  /** paginador para la consulta los consecutivos **/
  public paginador: PaginadorDTO;

  /** Es el cliente autenticado o el cliente asociado al user autenticado */
  public idCliente: number;

  /** Busqueda por nomenclaturas, separadas por comas */
  public nomenclaturas: string;

  /** Busqueda por consecutivos, separadas por comas */
  public consecutivos: string;

  /** Busqueda por el identificador del usuario */
  public idUsuario: number;

  /** Busqueda por fecha de solicitud inicial */
  public fechaSolicitudInicial: Date;

  /** Busqueda por fecha de solicitud final */
  public fechaSolicitudFinal: Date;

  /** Busqueda por estado del consecutivo */
  public estado: number;

  /** lista de otros filtros agregados */
  public filtrosAgregados: Array<CampoFiltroDTO>;

  /**
   * se debe inicializar con null para eliminar la opcion undefined
   */
  constructor() {
    this.nomenclaturas = null;
    this.consecutivos = null;
    this.idUsuario = null;
    this.fechaSolicitudInicial = null;
    this.fechaSolicitudFinal = null;
    this.estado = null;
  }
}
