import { PaginadorResponseDTO } from '../transversal/paginador-response.dto';

/**
 * DTO que contiene los datos iniciales al momento de entrar al submodulo de
 * administrar series documentales
 *
 * @author Carlos Andres Diaz
 */
export class InitAdminSeriesDocumentalesDTO {

  /** Es el response inicial de las series paginados **/
  public series: PaginadorResponseDTO;
}
