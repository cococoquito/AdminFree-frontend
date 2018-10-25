import { AutenticacionDTO } from './../../model/configuraciones/autenticacion.dto';
import { Component, OnInit } from '@angular/core';
import { AdminClienteService } from './../../core/services/admin-cliente.service';

/**
 * Componente para la administracion de los clientes del sistema
 */
@Component({
  templateUrl: './admin-clientes.component.html'
})
export class AdminClientesComponent implements OnInit {

  /** Se utiliza para capturar el usuario ingresado por el admin */
  public usuario: string;

  /** Se utiliza para capturar la clave ingresado por el admin */
  public clave: string;

  /**
   * Creates an instance of AdminClientesComponent.
   *
   * @param contiene los servicios para administrar los clientes
   */
  constructor(private service: AdminClienteService) { }

  ngOnInit() {}

  /**
   * Metodo que permite iniciar sesion al modulo de administrar clientes
   */
  public iniciarSesion(): void {
    if (this.usuario && this.clave) {
      const credenciales: AutenticacionDTO = new AutenticacionDTO();
      credenciales.clave = this.clave;
      credenciales.usuario = this.usuario;
      this.service.iniciarSesion(credenciales).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
