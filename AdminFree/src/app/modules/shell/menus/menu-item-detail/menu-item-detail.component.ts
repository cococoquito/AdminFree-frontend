import { MenuItem } from './../model/menu-item';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'admin-menu-item-detail',
  templateUrl: './menu-item-detail.component.html',
  styleUrls: ['./menu-item-detail.component.css']
})
export class MenuItemDetailComponent implements OnInit {
  @Input() items: Array<MenuItem>;
  constructor() { }

  ngOnInit() {
  }

}
