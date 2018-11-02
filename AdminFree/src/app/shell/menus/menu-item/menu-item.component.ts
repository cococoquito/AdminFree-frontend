import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from './../../../model/common/menu-item';

@Component({
  selector: 'admin-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() item = <MenuItem>null; // MenuItem; <-- see angular-cli issue #2034
  constructor() { }

  ngOnInit() {
  }

}
