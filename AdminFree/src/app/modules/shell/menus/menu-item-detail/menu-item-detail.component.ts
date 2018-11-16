import { MenuItem } from './../model/menu-item';
import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'admin-menu-item-detail',
  templateUrl: './menu-item-detail.component.html',
  animations: [
    trigger('openCloseMenu', [
      state('open', style({ transform: 'translate3d(0, 0, 0)' })),
      state('closed', style({ transform: 'translate3d(100%, 0, 0)', display: 'none'})),
      transition('* => *', animate(300))
    ])
  ]
})
export class MenuItemDetailComponent implements OnInit {
  @Input() items: Array<MenuItem>;
  constructor() {console.log('CREADO'); }

  ngOnInit() {
  }

}
