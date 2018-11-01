import { ScreenService } from './../services/screen.service';
import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'admin-bar-user',
  templateUrl: './bar-user.component.html',
  styleUrls: ['./bar-user.component.css']
})
export class BarUserComponent implements OnInit {
  items: MenuItem[];
  display = false;
  constructor(public screenService: ScreenService) { }

  ngOnInit() {
    this.items = [
      {label: 'Página de Inicio', icon: 'fa fa-fw fa-home'},
      {label: 'Cambiar Contraseña', icon: 'fa fa-fw fa-gear'},
      {label: 'Cerrar Sesión', icon: 'fa fa-fw fa-power-off'}
  ];
  }

}
