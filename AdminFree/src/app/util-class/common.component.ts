import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from './../model/error-response';
import { MessagesConstant } from './../constants/messages.constant';
import { HttpStatusConstant } from './../constants/http-status.constant';

/**
 * Contiene los metodos comunes para los componentes de la aplicacion,
 * los componentes deben heredar de esta clase
 *
 * @author Carlos Andres Diaz
 */
export class CommonComponent {

  /** bandera que identifica si ya se hizo submit */
  protected submitted: boolean;

  /**
   * Metodo que permite establecer que el user ya hizo submitted
   */
  protected onSubmit(): boolean {
    this.submitted = true;
    return this.submitted;
  }

  /**
   * Metodo que permite limpiar el submit
   */
  protected cleanSubmit(): void {
    this.submitted = false;
  }

  /**
   * Metodo que permite mostrar solo el mensaje de error
   *
   * @param error, Es el Http error retornado del servidor
   */
  protected showMensajeError(error: HttpErrorResponse): string {
    const errorResponse: ErrorResponse = this.getErrorResponse(error);
    if (errorResponse && errorResponse.mensaje) {
      return errorResponse.mensaje.mensaje;
    }
    return MessagesConstant.INTERNAL_SERVER_ERROR;
  }

  /**
   * Metodo que permite construir el mensaje de error con el
   * codigo del status de un error-response del servidor
   *
   * @param error, Es el Http error retornado del servidor
   * @returns Objecto construido con el mensaje y codigo-status del error
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
        case HttpStatusConstant.BAD_REQUEST: {
          mensaje = this.getBusinessMessage(codigoMensaje);
          break;
        }

        // status cuando intentan ingresar un recurso sin el TOKEN
        case HttpStatusConstant.UNAUTHORIZED: {
          mensaje = MessagesConstant.AUTORIZACION_FALLIDA;
          break;
        }

        // si no es ninguna de las anteriores, se define como internal server error
        default: {
          mensaje = MessagesConstant.INTERNAL_SERVER_ERROR + codigoMensaje;
          break;
        }
      }
    } else {
      mensaje = error.message;
      if (HttpStatusConstant.UNKNOWN === status) {
        mensaje = MessagesConstant.AUTORIZACION_FALLIDA;
      }
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

      case MessagesConstant.COD_AUTENTICACION_FALLIDA_USER: {
        businessMsj = MessagesConstant.AUTENTICACION_FALLIDA_USER;
        break;
      }

      case MessagesConstant.COD_AUTENTICACION_FALLIDA_ADMIN: {
        businessMsj = MessagesConstant.AUTENTICACION_FALLIDA_ADMIN;
        break;
      }
    }
    return businessMsj;
  }
}
