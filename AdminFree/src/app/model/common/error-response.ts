import { MessageResponse } from './message-response';

/**
 * Se utiliza para construir el error retornado por el server
 *
 * @author Carlos Andres Diaz
 */
export class ErrorResponse {

  /** Es el mensaje relacionado al codigo **/
  public mensaje: MessageResponse;

  /** es el status del error **/
  public status: number;

  constructor() {
    this.mensaje = new MessageResponse();
  }
}
