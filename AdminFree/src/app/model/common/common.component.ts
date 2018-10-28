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

    // se valida si hay codigo del mensaje en el body del error
    if (error.error && error.error.mensaje) {

      // del server siempre llega el codigo del mensaje
      const codigoMensaje: string = error.error.mensaje;

      // se valida el status-response
      switch (status) {

        // status para los errores de negocio
        case HttpStatus.BAD_REQUEST: {
          mensaje = this.getBusinessMessage(codigoMensaje);
          break;
        }

        // status cuando intentan ingresar un recurso sin el TOKEN
        case HttpStatus.UNAUTHORIZED: {
          mensaje = BusinessMessage.AUTORIZACION_FALLIDA;
          break;
        }

        // si no son ningunas de las anteriores, se define como internal server error
        default: {
          mensaje = BusinessMessage.INTERNAL_SERVER_ERROR + error.error.mensaje;
          break;
        }
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

  /**
   * Metodo que permite obtener el business mensaje que corresponsa al codigo
   */
  private getBusinessMessage(codBusinessMsj: string): string {
    let businessMsj = '';

    // se verifica que tipo de business msj corresponde
    switch (codBusinessMsj) {

      // Business error autenticacion fallida
      case CodigoBusinessMessage.COD_AUTENTICACION_FALLIDA: {
        businessMsj = BusinessMessage.AUTENTICACION_FALLIDA;
      }
    }
    return businessMsj;
  }
}
