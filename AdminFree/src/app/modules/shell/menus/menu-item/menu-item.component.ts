import { Component, Input } from '@angular/core';
import { MenuItem } from './../model/menu-item';

@Component({
  selector: 'admin-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  @Input()
  public item: MenuItem;

}
