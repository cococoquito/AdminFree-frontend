import { Injectable } from '@angular/core';
import { Message } from 'primeng/components/common/api';

/**
 * Estado para administrar los Mensajes en las pantallas
 *
 * @author Carlos Andres Diaz
 */
@Injectable({ providedIn: 'root' })
export class MessagesState {

  /** Son los mensajes a mostrar en pantalla */
  public msgs: Message[];

  /**
   * Metodo que permite limpiar los mensaje en un tiempo definido,
   * con esto se esconde el panel del los mensajes
   */
  public timerClean(time: number): void {
    setTimeout(() => { this.msgs = []; }, time);
  }

  /**
   * Metodo que permite limpiar los mensajes, escondiendo
   * el panel de mensajes visualizado en la pantalla
   */
  public clean(): void {
    this.msgs = [];
  }

  /**
   * Metodo que permite visualizar el panel de mensajes Exitoso
   */
  public showSuccess(summary: string, detail: string): void {
    this.msgs = [];
    this.msgs.push({
      severity: 'success',
      summary: summary,
      detail: detail
    });
  }

  /**
   * Metodo que permite visualizar el panel de mensajes Informacion
   */
  public showInfo(summary: string, detail: string): void {
    this.msgs = [];
    this.msgs.push({
      severity: 'info',
      summary: summary,
      detail: detail
    });
  }

  /**
   * Metodo que permite visualizar el panel de mensajes Advertencia
   */
  public showWarn(summary: string, detail: string): void {
    this.msgs = [];
    this.msgs.push({
      severity: 'warn',
      summary: summary,
      detail: detail
    });
  }

  /**
   * Metodo que permite visualizar el panel de mensajes Error
   */
  public showError(summary: string, detail: string): void {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: summary,
      detail: detail
    });
  }
}
