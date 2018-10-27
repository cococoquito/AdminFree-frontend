import { keyLocalStore } from './../../enums/app-enums';
import { AdminClientesDTO } from './../../model/configuraciones/admin-clientes.dto';
import { AutenticacionDTO } from './../../model/configuraciones/autenticacion.dto';
import { ClienteDTO } from './../../model/configuraciones/cliente.dto';
import { Component, OnInit } from '@angular/core';
import { AdminClienteService } from './../../core/services/admin-cliente.service';

/**
 * Componente para la administracion de los clientes del sistema
 */
@Component({
  templateUrl: './admin-clientes.component.html'
})
export class AdminClientesComponent implements OnInit {

  /** Se utiliza para capturar las credenciales del usuario */
  public entrada: AutenticacionDTO;

  /** Contiene el resultado de la autenticacion */
  public autenticacion: AdminClientesDTO;

  /** Contiene el mensaje de error para la autenticacion */
  public msjError: string;

  /**
   * Creates an instance of AdminClientesComponent.
   *
   * @param contiene los servicios para administrar los clientes
   */
  constructor(private service: AdminClienteService) {}

  ngOnInit() {
    const credenciales = localStorage.getItem(keyLocalStore.KEY_USER_SECURITY);
    if (credenciales) {
      this.autenticacion = new AdminClientesDTO();
      this.autenticacion.credenciales = JSON.parse(credenciales);

      const clientes = localStorage.getItem(keyLocalStore.KEY_ADMIN_CLIENTES);
      if (clientes) {
        this.autenticacion.clientes = JSON.parse(clientes);
      } else {
        this.autenticacion.clientes = [];
      }
    } else {
      this.entrada = new AutenticacionDTO();
    }
  }

  /**
   * Metodo que permite iniciar sesion al modulo de administrar clientes
   */
  public iniciarSesion(): void {
    this.msjError = null;
    if (this.entrada && this.entrada.clave && this.entrada.usuario) {
      this.service.iniciarSesion(this.entrada).subscribe(
        data => {
          this.autenticacion = data;
          this.autenticacion.credenciales.clave = this.entrada.clave;
          this.autenticacion.credenciales.usuario = this.entrada.usuario;
          this.msjError = null;
          localStorage.setItem(keyLocalStore.KEY_USER_SECURITY, JSON.stringify(this.autenticacion.credenciales));
          localStorage.setItem(keyLocalStore.KEY_ADMIN_CLIENTES, JSON.stringify(this.autenticacion.clientes));
        },
        error => {
          this.msjError =
            'El Usuario y la Contraseña que usted ingresó no ha sido reconocido. Por favor, inténtelo de nuevo.';
        }
      );
    }
  }

  /**
   * Metodo que permite soportar el evento eliminar cliente
   */
  public eliminarCliente(cliente: ClienteDTO) {
    if (confirm('¿Está seguro de eliminar el siguiente cliente:? ' + cliente.nombre)) {
      this.service.eliminarCliente(cliente).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  /**
   * Metodo que soporta el evento click del boton cerrar sesion
   */
  public cerrarSesion(): void {
    localStorage.removeItem(keyLocalStore.KEY_USER_SECURITY);
    localStorage.removeItem(keyLocalStore.KEY_ADMIN_CLIENTES);
    this.entrada = new AutenticacionDTO();
    this.autenticacion = null;
  }
}
