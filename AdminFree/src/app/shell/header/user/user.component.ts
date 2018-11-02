import { Component, OnInit } from '@angular/core';
import { ScreenService } from './../../services/screen.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  items: MenuItem[];
  display = false;
  constructor(public screenService: ScreenService) {}

  ngOnInit() {
    this.items = [
      { label: 'Página de Inicio', icon: 'fa fa-fw fa-home' },
      { label: 'Cambiar Contraseña', icon: 'fa fa-fw fa-gear' },
      { label: 'Cerrar Sesión', icon: 'fa fa-fw fa-power-off' }
    ];
  }
}
