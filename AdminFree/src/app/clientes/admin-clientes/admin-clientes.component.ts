import { Component, OnInit } from '@angular/core';
import { CommonComponent } from './../../model/common/common.component';
import { AdminClientesDTO } from './../../model/configuraciones/admin-clientes.dto';
import { AutenticacionDTO } from './../../model/configuraciones/autenticacion.dto';
import { ClienteDTO } from './../../model/configuraciones/cliente.dto';
import { AdminClienteService } from './../../core/services/admin-cliente.service';
import { KeyLocalStoreConstant } from '../../constants/key-localstore.constant';

/**
 * Componente para la administracion de los clientes del sistema
 */
@Component({
  templateUrl: './admin-clientes.component.html'
})
export class AdminClientesComponent extends CommonComponent implements OnInit {

  /** Se utiliza para capturar las credenciales del usuario */
  public entrada: AutenticacionDTO;

  /** Contiene el resultado de la autenticacion */
  public autenticacion: AdminClientesDTO;

  /** Contiene el mensaje de error para la autenticacion */
  public msjError: string;

  /** Se utiliza para crear el cliente */
  public clienteCrear: ClienteDTO;

  public token: ClienteDTO;

  public clienteModificar: ClienteDTO;

  private clienteOrigen: ClienteDTO;

  /**
   * Creates an instance of AdminClientesComponent.
   *
   * @param contiene los servicios para administrar los clientes
   */
  constructor(private service: AdminClienteService) {
    super();
  }

  ngOnInit() {
    const credenciales = localStorage.getItem(
      KeyLocalStoreConstant.KEY_USER_SECURITY
    );
    if (credenciales) {
      this.autenticacion = new AdminClientesDTO();
      this.autenticacion.credenciales = JSON.parse(credenciales);

      const clientes = localStorage.getItem(
        KeyLocalStoreConstant.KEY_ADMIN_CLIENTES
      );
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
          localStorage.setItem(
            KeyLocalStoreConstant.KEY_USER_SECURITY,
            JSON.stringify(this.autenticacion.credenciales)
          );
          localStorage.setItem(
            KeyLocalStoreConstant.KEY_ADMIN_CLIENTES,
            JSON.stringify(this.autenticacion.clientes)
          );
        },
        error => {
          this.msjError = this.getErrorResponse(error).mensaje.mensaje;
        }
      );
    }
  }

  public agregarCliente() {
    this.msjError = null;
    this.service.crearCliente(this.clienteCrear).subscribe(
      data => {
        this.autenticacion.clientes.push(data);
        localStorage.setItem(
          KeyLocalStoreConstant.KEY_ADMIN_CLIENTES,
          JSON.stringify(this.autenticacion.clientes)
        );
        this.clienteCrear = null;
      },
      error => {
        this.msjError = this.getErrorResponse(error).mensaje.mensaje;
      }
    );
  }

  /**
   * Metodo que permite soportar el evento eliminar cliente
   */
  public eliminarCliente(cliente: ClienteDTO) {
    this.msjError = null;
    if (
      confirm(
        '¿Está seguro de ELIMINAR el siguiente cliente? ' + cliente.nombre
      )
    ) {
      this.service.eliminarCliente(cliente).subscribe(
        data => {
          // la funcion splice es para eliminar el item de la lista
          const i = this.autenticacion.clientes.indexOf(cliente, 0);
          if (i > -1) {
            this.autenticacion.clientes.splice(i, 1);
          }
          localStorage.setItem(
            KeyLocalStoreConstant.KEY_ADMIN_CLIENTES,
            JSON.stringify(this.autenticacion.clientes)
          );
          alert('El cliente fue eliminado exitosamente.');
        },
        error => {
          this.msjError = this.getErrorResponse(error).mensaje.mensaje;
        }
      );
    }
  }

  public verToken(cliente: ClienteDTO): void {
    this.token = cliente;
  }

  public limpiarToken(): void {
    this.token = null;
  }

  /**
   * Metodo que soporta el evento click del boton agregar cliente
   */
  public btnAgregarCliente(): void {
    this.clienteCrear = new ClienteDTO();
  }

  /**
   * Metodo que soporta el evento click del boton regresar
   */
  public btnRegresar(): void {
    this.clienteCrear = null;
  }

  public inactivarCliente(cliente: ClienteDTO): void {
    if (
      confirm(
        '¿Está seguro de INACTIVAR el siguiente cliente? ' + cliente.nombre
      )
    ) {
      cliente.tipoEvento = 'IN';
      this.service.activarInactivarCliente(cliente).subscribe(
        data => {
          cliente.estado = data.estado;
          cliente.estadoNombre = data.estadoNombre;
          cliente.fechaInactivacion = data.fechaInactivacion;
          localStorage.setItem(
            KeyLocalStoreConstant.KEY_ADMIN_CLIENTES,
            JSON.stringify(this.autenticacion.clientes)
          );
          alert('El cliente fue INACTIVADO exitosamente.');
        },
        error => {
          this.msjError = this.getErrorResponse(error).mensaje.mensaje;
        }
      );
    }
  }

  public activarCliente(cliente: ClienteDTO): void {
    if (
      confirm('¿Está seguro de ACTIVAR el siguiente cliente? ' + cliente.nombre)
    ) {
      cliente.tipoEvento = 'AC';
      this.service.activarInactivarCliente(cliente).subscribe(
        data => {
          cliente.estado = data.estado;
          cliente.estadoNombre = data.estadoNombre;
          cliente.fechaInactivacion = data.fechaInactivacion;
          cliente.fechaActivacion = data.fechaActivacion;
          localStorage.setItem(
            KeyLocalStoreConstant.KEY_ADMIN_CLIENTES,
            JSON.stringify(this.autenticacion.clientes)
          );
          alert('El cliente fue ACTIVADO exitosamente.');
        },
        error => {
          this.msjError = this.getErrorResponse(error).mensaje.mensaje;
        }
      );
    }
  }

  public habilitarEdicionCliente(cliente: ClienteDTO): void {
    if (this.clienteModificar && this.clienteOrigen) {
      this.clienteModificar.nombre = this.clienteOrigen.nombre;
      this.clienteModificar.emails = this.clienteOrigen.emails;
      this.clienteModificar.telefonos = this.clienteOrigen.telefonos;
    }

    this.clienteModificar = cliente;
    this.clienteOrigen = new ClienteDTO();
    this.clienteOrigen.nombre = cliente.nombre;
    this.clienteOrigen.emails = cliente.emails;
    this.clienteOrigen.telefonos = cliente.telefonos;
  }

  public modificarCliente(): void {
    if (
      this.clienteModificar.nombre !== this.clienteOrigen.nombre ||
      this.clienteModificar.emails !== this.clienteOrigen.emails ||
      this.clienteModificar.telefonos !== this.clienteOrigen.telefonos
    ) {
      this.clienteModificar.tipoEvento = 'A';
      this.service.modificarCliente(this.clienteModificar).subscribe(
        data => {
          this.clienteModificar = null;
          this.clienteOrigen = null;
          localStorage.setItem(
            KeyLocalStoreConstant.KEY_ADMIN_CLIENTES,
            JSON.stringify(this.autenticacion.clientes)
          );
          alert('El cliente fue MODIFICADO exitosamente.');
        },
        error => {
          this.msjError = this.getErrorResponse(error).mensaje.mensaje;
        }
      );
    } else {
      this.clienteModificar = null;
      this.clienteOrigen = null;
    }
  }

  /**
   * Metodo que soporta el evento click del boton cerrar sesion
   */
  public cerrarSesion(): void {
    localStorage.removeItem(KeyLocalStoreConstant.KEY_USER_SECURITY);
    localStorage.removeItem(KeyLocalStoreConstant.KEY_ADMIN_CLIENTES);
    this.entrada = new AutenticacionDTO();
    this.autenticacion = null;
    this.token = null;
    this.clienteModificar = null;
  }
}
