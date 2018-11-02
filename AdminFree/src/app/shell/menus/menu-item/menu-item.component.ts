import { Component, Input } from '@angular/core';
import { MenuItem } from './../../../model/common/menu-item';

/**
 * Es el Item del menu a visualizar en el Shell
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  @Input()
  public item = <MenuItem>null;
}
