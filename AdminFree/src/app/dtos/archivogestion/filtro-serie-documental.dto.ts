import { PaginadorDTO } from '../transversal/paginador-dto';

/**
 * DTO que contiene los atributos para los filtros de busqueda de las series documentales
 *
 * @author Carlos Andres Diaz
 *
 */
export class FiltroSerieDocumentalDTO {

  /** paginador para la consulta de las series documentales **/
  public paginador: PaginadorDTO;

  /** Es el cliente autenticado o el cliente asociado al user autenticado */
  public idCliente: number;

  /** Filtro por codigo de la serie documental */
  public codigoSerieDocumental: string;

  /** Filtro por nombre de la serie documental */
  public nombreSerieDocumental: string;

  /** Filtro por codigo de la sub-serie documental */
  public codigoSubSerieDocumental: string;

  /** Filtro por nombre de la sub-serie documental */
  public nombreSubSerieDocumental: string;

  /**
   * se debe inicializar con null para eliminar la opcion undefined
   */
  constructor() {
    this.codigoSerieDocumental = null;
    this.nombreSerieDocumental = null;
    this.codigoSubSerieDocumental = null;
    this.nombreSubSerieDocumental = null;
  }
}
