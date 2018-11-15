import { MenuItem } from './../model/menu-item';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'admin-menu-item-detail',
  templateUrl: './menu-item-detail.component.html'
})
export class MenuItemDetailComponent implements OnInit {
  @Input() items: Array<MenuItem>;
  constructor() { }

  ngOnInit() {
  }

}
