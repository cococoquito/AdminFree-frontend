import { Component, OnInit } from '@angular/core';
import { MenuService } from './../services/menu.service';
import { ScreenService } from './../services/screen.service';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public screenService: ScreenService,
    public menuService: MenuService) { }

  ngOnInit() {
  }

}
