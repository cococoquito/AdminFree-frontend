import { Component } from '@angular/core';
import { MenuState } from '../../../states/menu.state';

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

  /**
   * @param menuState, se utiliza para mostrar/ocultar el menu
   * y validar el tamanio de la pantalla
   */
  constructor(public menuState: MenuState) {}
}
