import { Component } from '@angular/core';
import { ShellState } from '../../../states/shell.state';

/**
 * Es el Header del shell de la aplicacion, contiene el menu de las
 * configuraciones del usuario, cierre de sesion
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public shell: ShellState) {}
}
