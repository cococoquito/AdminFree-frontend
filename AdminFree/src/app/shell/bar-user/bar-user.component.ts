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
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Página de Inicio', icon: 'pi pi-fw pi-plus'},
      {label: 'Cambiar Contraseña', icon: 'pi pi-fw pi-download'},
      {label: 'Cerrar Sesión', icon: 'pi pi-fw pi-refresh'}
  ];
  }

}
