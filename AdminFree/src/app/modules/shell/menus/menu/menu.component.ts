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
  constructor(public menuState: MenuState) {
    console.log('MenuComponent CREADO');
  }
}
