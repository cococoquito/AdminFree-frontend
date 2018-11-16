import { Component, Input } from '@angular/core';
import { MenuItem } from './../model/menu-item';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'admin-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  @Input()
  public item: MenuItem;
  constructor() {

  }

  /**
   * openItem
   */
  public openItems() {
    if (this.item && this.item.items) {
      for (const i of this.item.items) {
        i.isSeleccionado = !i.isSeleccionado;
      }
    }  this.item.isSeleccionado = !this.item.isSeleccionado;
  }

}
