/**
 * DTO que contiene los atributos para el filtro de busqueda de los consecutivos
 * solicitados para el anio actual
 *
 * @author Carlos Andres Diaz
 */
export class FiltroConsecutivosAnioActualDTO {

  /** Es el cliente autenticado o el cliente asociado al user autenticado */
  public idCliente: number;

  /** Busqueda por nomenclaturas, separadas por comas */
  public nomenclaturas: string;

  /** Busqueda por consecutivos, separadas por comas */
  public consecutivos: string;

  /** Busqueda por usuarios, pueden llegar varios */
  public idsUsuarios: Array<number>;

  /** Busqueda por fecha de solicitud inicial */
  public fechaSolicitudInicial: Date;

  /** Busqueda por fecha de solicitud final */
  public fechaSolicitudFinal: Date;

  /** Busqueda por estado del consecutivo, puede llegar varios */
  public estados: Array<number>;
}
