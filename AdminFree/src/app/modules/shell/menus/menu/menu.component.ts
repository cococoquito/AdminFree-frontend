import { Component } from '@angular/core';
import { MenuState } from './../../../../states/menu.state';

/**
 * Es el Menu del shell a visualizar en la aplicacion
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  /**
   * @param menuState, se utiliza para obtener los Modulos
   * con sus items para ser visualizados en el menu
   */
  constructor(public menuState: MenuState) {}
}
