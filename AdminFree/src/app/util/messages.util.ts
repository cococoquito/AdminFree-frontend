import { Message } from 'primeng/components/common/api';

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
  public static getMsjSuccess(summary: string, detail: string): Message {
    return this.getMsj(summary, detail, this.SUCCESS);
  }

  /**
   * Metodo que permite construir el mensaje de Informacion
   */
  public static getMsjInfo(summary: string, detail: string): Message {
    return this.getMsj(summary, detail, this.INFO);
  }

  /**
   * Metodo que permite construir el mensaje de Advertencia
   */
  public static getMsjWarn(summary: string, detail: string): Message {
    return this.getMsj(summary, detail, this.WARN);
  }

  /**
   * Metodo que permite construir el mensaje de Error
   */
  public static getMsjError(summary: string, detail: string): Message {
    return this.getMsj(summary, detail, this.ERROR);
  }

  /**
   * Metodo que permite construir el mensaje de Exitoso para toast
   */
  public static getToastSuccess(summary: string, detail: string): Message {
    return this.getToast(summary, detail, this.SUCCESS);
  }

  /**
   * Metodo que permite construir el mensaje de INFO para toast
   */
  public static getToastInfo(summary: string, detail: string): Message {
    return this.getToast(summary, detail, this.INFO);
  }

  /**
   * Metodo que permite construir el mensaje de Advertencia para toast
   */
  public static getToastWarn(summary: string, detail: string): Message {
    return this.getToast(summary, detail, this.WARN);
  }

  /**
   * Metodo que permite construir el mensaje de ERROR para toast
   */
  public static getToastError(summary: string, detail: string): Message {
    return this.getToast(summary, detail, this.ERROR);
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
