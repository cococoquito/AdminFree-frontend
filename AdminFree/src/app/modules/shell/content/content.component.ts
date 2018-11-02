import { Component } from '@angular/core';
import { ShellState } from './../../../states/shell.state';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

/**
 * Componente que contiene el router para incluir los demas componentes
 * dependiendo de la navegacion, este componente tambien contiene los menus
 * para dispositivos con resolucion grande y pequenia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({ width: '225px' })),
      state('closed', style({ width: '0px' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class ContentComponent {
  constructor(public estado: ShellState) {}
}
