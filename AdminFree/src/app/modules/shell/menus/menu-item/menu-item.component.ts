import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './../model/menu-item';
@Component({
  selector: 'admin-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  @Input()
  public item: MenuItem;
  constructor(private router: Router) {}

  /**
   * openItem
   */
  public openItems() {
    if (this.item && this.item.items) {
      for (const i of this.item.items) {
        i.isSeleccionado = !i.isSeleccionado;
      }
    }
    this.item.isSeleccionado = !this.item.isSeleccionado;
  }

  public goRouter(url: string) {
    this.router.navigate([url]);
  }

}
