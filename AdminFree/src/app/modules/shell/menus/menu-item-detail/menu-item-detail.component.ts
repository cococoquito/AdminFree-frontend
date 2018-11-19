import { Component, Input } from '@angular/core';
import { MenuItem } from './../../../../model/menu-item';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

/**
 * Es el detalle de un Modulo/Sub-modulo donde se configura el estilo
 * de cada items que tenga el Modulo
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-menu-item-detail',
  templateUrl: './menu-item-detail.component.html',
  animations: [
    trigger('openCloseModulo', [
      state('open', style({ transform: 'translate3d(0, 0, 0)' })),
      state('closed', style({ transform: 'translate3d(100%, 0, 0)', height: '0px', display: 'none' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class MenuItemDetailComponent {

  /** Modulo que contiene sus items para ser visualizado en el Menu */
  @Input() modulo: MenuItem;
}
