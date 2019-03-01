import { PaginadorDTO } from '../transversal/paginador-dto';

/**
 * DTO que contiene los atributos para el filtro de busqueda de los consecutivos
 * solicitados para el anio actual
 *
 * @author Carlos Andres Diaz
 */
export class FiltroConsecutivosAnioActualDTO {

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
