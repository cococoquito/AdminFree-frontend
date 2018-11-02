import { MessageResponseDTO } from './../dtos/transversal/message-response.dto';

/**
 * Se utiliza para construir el error retornado por el server
 *
 * @author Carlos Andres Diaz
 */
export class ErrorResponse {

  /** Es el mensaje relacionado al codigo response**/
  public mensaje: MessageResponseDTO;

  /** es el status del error **/
  public status: number;

  /**
   * Crea la instancia del mensaje de error del response
   */
  constructor() {
    this.mensaje = new MessageResponseDTO();
  }
}
