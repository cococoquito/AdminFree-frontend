import { FiltroConsecutivosDTO } from './filtro-consecutivos.dto';
import { PaginadorResponseDTO } from '../transversal/paginador-response.dto';

/**
 * DTO que contiene los atributos para el proceso de negocio
 * de transferir un consecutico a otro usuario
 *
 * @author Carlos Andres Diaz
 */
export class TransferirConsecutivoDTO {

  /** Identificador del cliente que contiene la tabla donde esta el consecutivo */
  public idCliente: number;

  /** Identificador del consecutivo a transferir */
  public idConsecutivo: number;

  /** Identificador del usuario quien tiene actualmente el consecutivo */
  public idUsuario: number;

  /** Identificador del usuario a quien se va transferir */
  public idUsuarioTransferir: number;

  /** Se utiliza para consultar los consecutivos de acuerdo al filtro establecido */
  public filtro: FiltroConsecutivosDTO;

  /** Es el response despues de hacer todo el proceso de negocio de transferir */
  public responseConsecutivos: PaginadorResponseDTO;
}
