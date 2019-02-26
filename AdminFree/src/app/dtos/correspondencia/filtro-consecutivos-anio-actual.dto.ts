import { SelectItemDTO } from './../transversal/select-item.dto';

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

  /** Busqueda por el identificador del usuario */
  public idUsuario: number;

  /** Busqueda por fecha de solicitud inicial */
  public fechaSolicitudInicial: Date;

  /** Busqueda por fecha de solicitud final */
  public fechaSolicitudFinal: Date;

  /** Busqueda por estado del consecutivo */
  public estado: number;

  /** ***********VARIABLES UTILIZADAS EN ANGULAR ************************* */
  /** Es el usuario seleccionado para el filtro de busqueda */
  public usuarioFiltro: SelectItemDTO;
}
