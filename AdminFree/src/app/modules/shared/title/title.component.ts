import { MessagesState } from './../../../states/messages.state';
import { Component, Input } from '@angular/core';

/**
 * Componente compartido para los titulos de todas las paginas
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {

  /** Titulo a mostrar en el componente */
  @Input() public titulo: string;

  /** Sub-titulo a mostrar en el componente */
  @Input() public subtitulo: string;

  /**
   * @param messagesState, se utiliza para visualizar el
   * componente de mensajes en el componente del titulo
   */
  constructor(public messagesState: MessagesState) {}
}
