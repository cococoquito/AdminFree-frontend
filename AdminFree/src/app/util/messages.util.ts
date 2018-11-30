import { Message } from 'primeng/components/common/api';
import { MsjFrontConstant } from './../constants/messages-frontend.constant';

/**
 * Clase utilitaria para la administracion del los mensajes a visualizar en pantalla
 *
 * @author Carlos Andres Diaz
 */
export class MsjUtil {

  /** Es el KEY para identificar el componente mensajes debajo del titulo */
  static readonly KEY_MESSAGE: string = 'msj';

  /** Es el KEY para identificar el componente tipo TOAST */
  static readonly KEY_TOAST: string = 'toast';

  /** Son los tipos de severity */
  static readonly SUCCESS: string = 'success';
  static readonly INFO: string = 'info';
  static readonly WARN: string = 'warn';
  static readonly ERROR: string = 'error';

  /**
   * Metodo que permite construir el mensaje de Exitoso
   */
  public static getMsjSuccess(detail: string): Message {
    return this.getMsj(MsjFrontConstant.EXITOSO, detail, this.SUCCESS);
  }

  /**
   * Metodo que permite construir el mensaje de Informacion
   */
  public static getMsjInfo(detail: string): Message {
    return this.getMsj(MsjFrontConstant.INFORMACION, detail, this.INFO);
  }

  /**
   * Metodo que permite construir el mensaje de Advertencia
   */
  public static getMsjWarn(detail: string): Message {
    return this.getMsj(MsjFrontConstant.ADVERTENCIA, detail, this.WARN);
  }

  /**
   * Metodo que permite construir el mensaje de Error
   */
  public static getMsjError(detail: string): Message {
    return this.getMsj(MsjFrontConstant.ERROR, detail, this.ERROR);
  }

  /**
   * Metodo que permite construir el mensaje de Error de validacion
   */
  public static getMsjErrorValidacion(detail: string): Message {
    return this.getMsj(MsjFrontConstant.ERROR_VALIDACION, detail, this.ERROR);
  }

  /**
   * Metodo que permite construir el mensaje de Exitoso para toast
   */
  public static getToastSuccess(detail: string): Message {
    return this.getToast(MsjFrontConstant.EXITOSO, detail, this.SUCCESS);
  }

  /**
   * Metodo que permite construir el mensaje de INFO para toast
   */
  public static getToastInfo(detail: string): Message {
    return this.getToast(MsjFrontConstant.INFORMACION, detail, this.INFO);
  }

  /**
   * Metodo que permite construir el mensaje de Advertencia para toast
   */
  public static getToastWarn(detail: string): Message {
    return this.getToast(MsjFrontConstant.ADVERTENCIA, detail, this.WARN);
  }

  /**
   * Metodo que permite construir el mensaje de ERROR para toast
   */
  public static getToastError(detail: string): Message {
    return this.getToast(MsjFrontConstant.ERROR, detail, this.ERROR);
  }

  /**
   * Metodo que permite construir el mensaje
   */
  private static getMsj(summary: string, detail: string, severity: string): Message {
    return {
      key: this.KEY_MESSAGE,
      severity: severity,
      summary: summary,
      detail: detail
    };
  }

  /**
   * Metodo que permite construir el mensaje tipo toast
   */
  private static getToast(summary: string, detail: string, severity: string): Message {
    return {
      key: this.KEY_TOAST,
      sticky: false,
      severity: severity,
      summary: summary,
      detail: detail
    };
  }
}
