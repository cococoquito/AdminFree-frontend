import { HttpErrorResponse } from '@angular/common/http';
import { BusinessMessage } from './../../enums/business-message.enum';
import { HttpStatus, CodigoBusinessMessage } from './../../enums/app-enums';
import { ErrorResponse } from './error-response';

/**
 * Contiene los metodos comunes para todos los componentes
 *
 * @author Carlos Andres Diaz
 */
export class CommonComponent {

  /**
   * Metodo que permite construir el mensaje de error con el
   * codigo del status de un error-response del servidor
   */
  protected getErrorResponse(error: HttpErrorResponse): ErrorResponse {
    const status: number = error.status;
    let mensaje: string;

    // se valida si hay mensaje en el body del error
    if (error.error && error.error.mensaje) {
      const codigoMensaje: string = error.error.mensaje;

      // BAD REQUEST son los errores de negocio
      if (HttpStatus.BAD_REQUEST === status) {

        switch (codigoMensaje) {

          // Business error autenticacion fallida
          case CodigoBusinessMessage.COD_AUTENTICACION_FALLIDA: {
            mensaje = BusinessMessage.AUTENTICACION_FALLIDA;
            break;
          }

          // Business error autorizacion fallida
          case CodigoBusinessMessage.COD_AUTORIZACION_FALLIDA: {
            mensaje = BusinessMessage.AUTORIZACION_FALLIDA;
            break;
          }
        }
      } else {
        mensaje = BusinessMessage.INTERNAL_SERVER_ERROR + error.error.mensaje;
      }
    } else {
      mensaje = error.message;
    }

    // se construye el errorResponse a retornar
    const errorResponse: ErrorResponse = new ErrorResponse();
    errorResponse.mensaje.mensaje = mensaje;
    errorResponse.status = status;
    return errorResponse;
  }
}
