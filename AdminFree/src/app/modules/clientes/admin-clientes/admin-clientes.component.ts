import { Component, OnInit } from '@angular/core';
import { CommonComponent } from './../../../util/common.component';
import { SeguridadService } from './../../../services/seguridad.service';
import { ConfiguracionesService } from './../../../services/configuraciones.service';
import { CredencialesDTO } from '../../../dtos/seguridad/credenciales.dto';
import { AdminClientesDTO } from './../../../dtos/configuraciones/admin-clientes.dto';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';
import { TipoEventoConstant } from './../../../constants/tipo-evento.constant';
import { LocalStoreUtil } from '../../../util/local-store.util';

/**
 * Componente para la administracion de los clientes del sistema
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './admin-clientes.component.html',
  providers: [ SeguridadService, ConfiguracionesService ]
})
export class AdminClientesComponent extends CommonComponent implements OnInit {

  /** Se utiliza para capturar las credenciales del usuario */
  public credenciales: CredencialesDTO;

  /** Contiene el resultado de la autenticacion */
  public autenticacion: AdminClientesDTO;

  /** Contiene el mensaje de error para este modulo */
  public msjError: string;

  /** Se utiliza para crear el cliente */
  public clienteCrear: ClienteDTO;

  /** Se utiliza para modificar el cliente */
  public clienteModificar: ClienteDTO;

  /** Se utiliza para mostrar el TOKEN y NOMBRE del usuario creado */
  public clienteCreado: ClienteDTO;

  /** Se utiliza como backup cuando el user cancela la modificacion */
  private clienteModificarOrigen: ClienteDTO;

  /**
   * Creates an instance of AdminClientesComponent.
   *
   * @param seguridadService, contiene los servicios para la autenticacion
   * @param configuracionesService, contiene los servicios para la administracion de clientes
   */
  constructor(
    private seguridadService: SeguridadService,
    private configuracionesService: ConfiguracionesService) {
    super();
  }

  /**
   * Metodo donde se inicia los datos del componente,
   * se toma en cuenta cuando se refresca el navegador
   * donde se toma el backup almacenado en el localstore
   */
  ngOnInit(): void {
    this.init();
  }

  /**
   * Metodo que soporta el evento click del boton iniciar sesion
   * para el modulo de administrar clientes
   */
  public iniciarSesion(): void {

    // se limpia errores anteriores
    this.msjError = null;

    // se valida la obligatoriedad de las credenciales
    if (this.credenciales &&
        this.credenciales.clave &&
        this.credenciales.usuario) {

      // se procede a iniciar sesion ante el sistema
      this.seguridadService.iniciarSesionAdminClientes(this.credenciales).subscribe(
        data => {

          // se configura el response
          this.autenticacion = data;
          this.autenticacion.credenciales.clave = this.credenciales.clave;
          this.autenticacion.credenciales.usuario = this.credenciales.usuario;
          this.credenciales = null;

          // se configura los datos del localstore
          this.setStateLocalStore();
        },
        error => {
          this.msjError = this.showMensajeError(error);
        }
      );
    }
  }

  /**
   * Metodo que permite agregar el cliente en el sistema
   */
  public agregarCliente(): void {

    // se limpia errores anteriores
    this.msjError = null;

    // se procede a crear el cliente en el sistema
    this.configuracionesService.crearCliente(this.clienteCrear).subscribe(
      data => {

        // se procede agregar el cliente en la lista visualizada en la pagina
        this.autenticacion.clientes.push(data);
        this.clienteCrear = null;
        this.clienteCreado = data;

        // se configura los datos del localstore
        this.setStateLocalStore();
      },
      error => {
        this.msjError = this.showMensajeError(error);
      }
    );
  }

  /**
   * Metodo que permite eliminar el cliente del sistema
   *
   * @param cliente, es el cliente seleccionado para eliminar
   */
  public eliminarCliente(cliente: ClienteDTO): void {

    // se limpia errores anteriores
    this.msjError = null;
    if (confirm('¿Está seguro de ELIMINAR el siguiente cliente? ' + cliente.nombre)) {

      // se procede a eliminar el cliente del sistema
      this.configuracionesService.eliminarCliente(cliente).subscribe(
        data => {

          // se elimina el cliente de la lista visualizada en la pagina
          const i = this.autenticacion.clientes.indexOf(cliente, 0);
          if (i > -1) {
            this.autenticacion.clientes.splice(i, 1);
          }

          // se configura los datos del localstore
          this.setStateLocalStore();

          // se muestra el mensaje en la pantalla
          alert('El cliente fue ELIMINADO exitosamente.');
        },
        error => {
          this.msjError = this.showMensajeError(error);
        }
      );
    }
  }

  /**
   * Metodo que permite INACTIVAR el cliente
   *
   * @param cliente, es el cliente seleccionado para INACTIVAR
   */
  public inactivarCliente(cliente: ClienteDTO): void {

    // se limpia errores anteriores
    this.msjError = null;
    if (confirm('¿Está seguro de INACTIVAR el siguiente cliente? ' + cliente.nombre)) {

      // se procede a inactivar el cliente en el sistema
      cliente.tipoEvento = TipoEventoConstant.INACTIVAR;
      this.configuracionesService.activarInactivarCliente(cliente).subscribe(
        data => {

          // se configura los datos retornado del servidor
          cliente.estado = data.estado;
          cliente.estadoNombre = data.estadoNombre;
          cliente.fechaInactivacion = data.fechaInactivacion;
          cliente.tipoEvento = null;

          // se configura los datos del localstore
          this.setStateLocalStore();

          // se muestra el mensaje en la pantalla
          alert('El cliente fue INACTIVADO exitosamente.');
        },
        error => {
          this.msjError = this.showMensajeError(error);
        }
      );
    }
  }

  /**
   * Metodo que permite ACTIVAR el cliente
   *
   * @param cliente, es el cliente seleccionado para ACTIVAR
   */
  public activarCliente(cliente: ClienteDTO): void {

    // se limpia errores anteriores
    this.msjError = null;
    if (confirm('¿Está seguro de ACTIVAR el siguiente cliente? ' + cliente.nombre)) {

      // se procede a ACTIVAR el cliente en el sistema
      cliente.tipoEvento = TipoEventoConstant.ACTIVAR;
      this.configuracionesService.activarInactivarCliente(cliente).subscribe(
        data => {

          // se configura los datos retornado del servidor
          cliente.estado = data.estado;
          cliente.estadoNombre = data.estadoNombre;
          cliente.fechaInactivacion = data.fechaInactivacion;
          cliente.fechaActivacion = data.fechaActivacion;
          cliente.tipoEvento = null;

          // se configura los datos del localstore
          this.setStateLocalStore();

          // se muestra el mensaje en la pantalla
          alert('El cliente fue ACTIVADO exitosamente.');
        },
        error => {
          this.msjError = this.showMensajeError(error);
        }
      );
    }
  }

  /**
   * Metodo que permite modificar el cliente
   */
  public modificarCliente(): void {

    // verifica si el usuario realizo alguna modificacion
    if (this.clienteModificar.nombre !== this.clienteModificarOrigen.nombre ||
        this.clienteModificar.emails !== this.clienteModificarOrigen.emails ||
        this.clienteModificar.telefonos !== this.clienteModificarOrigen.telefonos) {

      // se procede a MODIFICAR el cliente en el sistema
      this.clienteModificar.tipoEvento = TipoEventoConstant.ACTUALIZAR;
      this.configuracionesService.modificarCliente(this.clienteModificar).subscribe(
        data => {

          // se cierra el modo de edicion
          this.cerrarModoEdicion();

          // se configura los datos del localstore
          this.setStateLocalStore();

          // se muestra el mensaje en la pantalla
          alert('El cliente fue MODIFICADO exitosamente.');
        },
        error => {
          this.msjError = this.showMensajeError(error);
        }
      );
    } else {
      // se cierra el modo de edicion
      this.cerrarModoEdicion();
    }
  }

  /**
   * Metodo que soporta el evento click del boton agregar cliente
   */
  public showPanelCrearCliente(): void {
    this.clienteCrear = new ClienteDTO();
    this.clienteCrear.credenciales = new CredencialesDTO();
  }

  /**
   * Metodo que soporta el evento click del boton
   * regresar del panel crear paciente
   */
  public closePanelCrearCliente(): void {
    this.clienteCrear = null;
  }

  /**
   * Metodo que permite habilitar el modo edicion del cliente
   *
   * @param cliente, es el cliente seleccionado a modificar
   */
  public habilitarEdicionCliente(cliente: ClienteDTO): void {

    /**
     * si hay un cliente seleccionado con anterioridad, se configura
     * los datos de origen por si el usuario hizo alguna modificacion
     */
    if (this.clienteModificar && this.clienteModificarOrigen) {
      this.clienteModificar.nombre = this.clienteModificarOrigen.nombre;
      this.clienteModificar.emails = this.clienteModificarOrigen.emails;
      this.clienteModificar.telefonos = this.clienteModificarOrigen.telefonos;
    }

    /**
     * se hace el buckup de los datos del cliente por si se cancela la edicion
     */
    this.clienteModificar = cliente;
    this.clienteModificarOrigen = new ClienteDTO();
    this.clienteModificarOrigen.nombre = cliente.nombre;
    this.clienteModificarOrigen.emails = cliente.emails;
    this.clienteModificarOrigen.telefonos = cliente.telefonos;
  }

  /**
   * Metodo que soporta el evento click del boton cerrar sesion
   */
  public cerrarSesion(): void {

    // se limpia los keystore almacenados
    LocalStoreUtil.clientes(TipoEventoConstant.REMOVE);
    LocalStoreUtil.credencialesAdminClientes(TipoEventoConstant.REMOVE);

    // se crea la instancia de las credenciales por si intentan ingresar de nuevo
    this.credenciales = new CredencialesDTO();

    // se limpia todos las variable globales
    this.autenticacion = null;
    this.clienteCreado = null;
    this.clienteModificar = null;
    this.clienteModificarOrigen = null;
    this.msjError = null;
    this.clienteCrear = null;
  }

  /**
   * Metodo que permite limpiar el token generado
   */
  public limpiarToken(): void {
    this.clienteCreado = null;
  }

  /**
   * Metodo que inicializa las variables cuando el componente es creado
   */
  private init(): void {

    // se obtiene las credenciales del localstore
    const credenciales: CredencialesDTO = LocalStoreUtil.credencialesAdminClientes(TipoEventoConstant.GET);

    // se verifica si el administrador ya se autentico con anterioridad
    if (credenciales) {

      // se configura la autenticacion con sus credenciales
      this.autenticacion = new AdminClientesDTO();
      this.autenticacion.credenciales = credenciales;

      // se configura los clientes consultados con anterioridad
      this.autenticacion.clientes = LocalStoreUtil.clientes(TipoEventoConstant.GET);
    } else {
      // cuando el administrador no se ha autenticado
      this.credenciales = new CredencialesDTO();
    }
  }

  /**
   * Metodo que permite almacenar las credenciales y clientes al localStore
   */
  private setStateLocalStore(): void {

    // se limpia los keystore almacenados
    LocalStoreUtil.clientes(TipoEventoConstant.REMOVE);
    LocalStoreUtil.credencialesAdminClientes(TipoEventoConstant.REMOVE);

    // se verifica si el cliente esta autenticado
    if (this.autenticacion) {

      // se configura las credenciales en el localstore
      if (this.autenticacion.credenciales) {
          LocalStoreUtil.credencialesAdminClientes(TipoEventoConstant.SET, this.autenticacion.credenciales);
      }

      // se configura los clientes en el localstore
      if (this.autenticacion.clientes) {
          LocalStoreUtil.clientes(TipoEventoConstant.SET, this.autenticacion.clientes);
      }
    }
  }

  /**
   * Metodo que permite cerrar el modo de edicion
   */
  private cerrarModoEdicion(): void {
    this.clienteModificar = null;
    this.clienteModificarOrigen = null;
  }
}
