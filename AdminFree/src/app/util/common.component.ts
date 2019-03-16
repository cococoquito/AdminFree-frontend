import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from './../model/error-response';
import { MessageService } from 'primeng/api';
import { MsjUtil } from './messages.util';
import { HttpStatusConstant } from './../constants/http-status.constant';
import { MessagesBackendConstant } from './../constants/messages-backend.constant';
import { MessagesBackendKeyConstant } from './../constants/messages-backend-key.constant';
import { LabelsConstant } from './../constants/labels.constant';

/**
 * Contiene los metodos comunes para los componentes de la aplicacion,
 * los componentes deben heredar de esta clase
 *
 * @author Carlos Andres Diaz
 */
export class CommonComponent {

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   */
  constructor(protected messageService?: MessageService) {}

  /**
   * Metodo que permite limpiar los mensajes
   * visualizados en pantalla
   */
  protected limpiarMensajes(): boolean {
    if (this.messageService) {
      this.messageService.clear(LabelsConstant.KEY_MESSAGE);
    }
    return true;
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
    return MessagesBackendConstant.INTERNAL_SERVER_ERROR;
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
          mensaje = MessagesBackendConstant.AUTORIZACION_FALLIDA;
          break;
        }

        // si no es ninguna de las anteriores, se define como internal server error
        default: {
          mensaje = MessagesBackendConstant.INTERNAL_SERVER_ERROR + codigoMensaje;
          break;
        }
      }
    } else {
      if (error.error && error.error.message) {
        mensaje = error.error.message;
      } else {
        mensaje = MessagesBackendConstant.INTERNAL_SERVER_ERROR;
      }
    }

    // se construye el errorResponse a retornar
    const errorResponse: ErrorResponse = new ErrorResponse();
    errorResponse.mensaje.mensaje = mensaje;
    errorResponse.status = status;
    return errorResponse;
  }

  /**
   * Metodo remueve los espacios en blanco del comienzo y final
   */
  protected setTrim(valor: string): string {
    return (valor) ? valor.trim() : null;
  }

  /**
   * Metodo remueve los espacios en blanco del comienzo y final
   * para los componentes de filtro de busqueda
   */
  protected setTrimFilter(valor: string): string {
    valor = (valor) ? valor.trim() : null;
    valor = (valor !== null && valor.length === 0) ? null : valor;
    return valor;
  }

  /**
   * Metodo que permite obtener el business mensaje que corresponsa al codigo
   */
  private getBusinessMessage(codBusinessMsj: string): string {
    let businessMsj = '';

    // se verifica que tipo de business msj corresponde
    switch (codBusinessMsj) {

      case MessagesBackendKeyConstant.KEY_AUTENTICACION_FALLIDA_USER: {
        businessMsj = MessagesBackendConstant.AUTENTICACION_FALLIDA_USER;
        break;
      }

      case MessagesBackendKeyConstant.KEY_AUTENTICACION_FALLIDA_ADMIN: {
        businessMsj = MessagesBackendConstant.AUTENTICACION_FALLIDA_ADMIN;
        break;
      }

      case MessagesBackendKeyConstant.KEY_USUARIO_INGRESO_EXISTE: {
        businessMsj = MessagesBackendConstant.USUARIO_INGRESO_EXISTE;
        break;
      }

      case MessagesBackendKeyConstant.KEY_CLAVE_VERIFICACION_NO_COINCIDE: {
        businessMsj = MessagesBackendConstant.CLAVE_VERIFICACION_NO_COINCIDE;
        break;
      }

      case MessagesBackendKeyConstant.KEY_CLAVE_LONGITUD_NO_PERMITIDA: {
        businessMsj = MessagesBackendConstant.CLAVE_LONGITUD_NO_PERMITIDA;
        break;
      }

      case MessagesBackendKeyConstant.KEY_CLAVE_ESPACIOS_BLANCO: {
        businessMsj = MessagesBackendConstant.CLAVE_ESPACIOS_BLANCO;
        break;
      }

      case MessagesBackendKeyConstant.KEY_CLAVE_NO_COINCIDE: {
        businessMsj = MessagesBackendConstant.CLAVE_NO_COINCIDE;
        break;
      }

      case MessagesBackendKeyConstant.KEY_CLAVE_ACTUAL_IGUAL: {
        businessMsj = MessagesBackendConstant.CLAVE_ACTUAL_IGUAL;
        break;
      }

      case MessagesBackendKeyConstant.KEY_USER_INGRESO_LONGITUD_NO_PERMITIDA: {
        businessMsj = MessagesBackendConstant.USER_INGRESO_LONGITUD_NO_PERMITIDA;
        break;
      }

      case MessagesBackendKeyConstant.KEY_USER_INGRESO_ESPACIOS_BLANCO: {
        businessMsj = MessagesBackendConstant.USER_INGRESO_ESPACIOS_BLANCO;
        break;
      }

      case MessagesBackendKeyConstant.KEY_EXISTE_CAMPO_ENTRADA: {
        businessMsj = MessagesBackendConstant.EXISTE_CAMPO_ENTRADA;
        break;
      }

      case MessagesBackendKeyConstant.KEY_DELETE_CAMPO_NOMENCLATURA_ASOCIADA: {
        businessMsj = MessagesBackendConstant.DELETE_CAMPO_NOMENCLATURA_ASOCIADA;
        break;
      }

      case MessagesBackendKeyConstant.KEY_NOMENCLATURA_EXISTE: {
        businessMsj = MessagesBackendConstant.NOMENCLATURA_EXISTE;
        break;
      }

      case MessagesBackendKeyConstant.KEY_DELETE_NOMENCLATURA_CONSECUTIVO_ASOCIADA: {
        businessMsj = MessagesBackendConstant.DELETE_NOMENCLATURA_CONSECUTIVO_ASOCIADA;
        break;
      }

      case MessagesBackendKeyConstant.KEY_CONSECUTIVO_DOCUMENTO_MISMO_NOMBRE: {
        businessMsj = MessagesBackendConstant.CONSECUTIVO_DOCUMENTO_MISMO_NOMBRE;
        break;
      }

      case MessagesBackendKeyConstant.KEY_DOCUMENTO_VACIO: {
        businessMsj = MessagesBackendConstant.DOCUMENTO_VACIO;
        break;
      }

      case MessagesBackendKeyConstant.KEY_DOCUMENTO_NO_EXISTE: {
        businessMsj = MessagesBackendConstant.DOCUMENTO_NO_EXISTE;
        break;
      }
    }
    return businessMsj;
  }

  /**
   * Metodo utilitario que permite copiar un texto al portapapeles
   *
   * @param value, es el valor del texto a copiar
   * @param nameValue, nombre del valor ejemplo (Clave, Nombre, Telefono)
   */
  public copyToClipBoard(value: string, nameValue: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.messageService.add(MsjUtil.getToastSuccessMedium(nameValue + ' copiado al portapapeles'));
  }
}
