import { Component, OnInit } from '@angular/core';
import { AdminClienteService } from './../../core/services/admin-cliente.service';

/**
 * Componente para la administracion de los clientes del sistema
 */
@Component({
  templateUrl: './admin-clientes.component.html'
})
export class AdminClientesComponent implements OnInit {

  constructor(private service: AdminClienteService) { }

  ngOnInit() {
    this.service.getClientes().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
