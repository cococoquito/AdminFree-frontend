import { Component, Input } from '@angular/core';
import { MenuModulo } from '../../model/menu-modulo';

/**
 * Componente que representa los modulos del menu
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-menu-modulo',
  templateUrl: './menu-modulo.component.html',
  styleUrls: ['./menu-modulo.component.css']
})
export class MenuModuloComponent {
  @Input()
  public modulo: MenuModulo;
}
