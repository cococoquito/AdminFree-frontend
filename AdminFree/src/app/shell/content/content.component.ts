import { ScreenService } from './../services/screen.service';
import { MenuService } from './../services/menu.service';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'admin-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  animations: [

    trigger('openClose', [
      state('open', style({ width: '225px' })),
      state('closed', style({ width: '0px' })),
      transition('* => *', animate(300))
    ]),
  ]
})
export class ContentComponent implements OnInit {

  constructor(public menuService: MenuService, public screenService: ScreenService) { }

  ngOnInit() {
  }

}
