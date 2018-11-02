import { Component } from '@angular/core';
import { ShellService } from '../../../core/services/shell.service';

/**
 * Es el Menu del shell a visualizar en la aplicacion
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(public shell: ShellService) {}
}
