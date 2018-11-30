import { Component } from '@angular/core';
import { ShellState } from './../../../states/shell/shell.state';
import { MessagesState } from './../../../states/messages.state';

/**
 * Componente para el titulo de cada pagina
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {

  /**
   * @param shellState, se utiliza para tomar los
   * titulos y subtitulos a visualizar
   *
   * @param messagesState, se utiliza para visualizar el
   * componente de mensajes en el componente del titulo
   */
  constructor(
    public shellState: ShellState,
    public messagesState: MessagesState) {}
}
