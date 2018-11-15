import { Component } from '@angular/core';
import { MenuModulo } from './../../model/menu-modulo';

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
  public modulos: Array<MenuModulo>;
  constructor() {}
}
