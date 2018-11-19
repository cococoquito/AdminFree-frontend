import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShellState } from './../../../../states/shell/shell.state';
import { MenuItem } from './../model/menu-item';

/**
 * Componente que representa un Item en el Menu de la app
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {

  /** Contiene los datos del item a visualizar en el Menu */
  @Input() public item: MenuItem;

  /**
   * @param shellState, Se utiliza para los diferentes eventos de cada item
   * @param router, Se utiliza para hacer la navegacion al momento de dar
   * click en un item que contenga un router especifico
   */
  constructor(
    public shellState: ShellState,
    private router: Router) {}

  /**
   * Metodo que soporta el evento click de los items del menu,
   * donde se procede hacer la navegacion correspondiente a
   * su router configurado
   */
  public navigate(url: string) {
    this.router.navigate([url]);
  }
}
