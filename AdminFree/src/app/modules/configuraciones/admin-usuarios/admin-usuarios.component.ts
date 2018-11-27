import { Component, OnInit } from '@angular/core';
import { CommonComponent } from './../../../util/common.component';
import { AdminUsuarioService } from './../../../services/admin-usuario.service';
import { LocalStoreUtil } from './../../../util/local-store.util';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';

/**
 * Componente para la administracion de los Usuarios del sistema
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css'],
  providers: [AdminUsuarioService]
})
export class AdminUsuariosComponent extends CommonComponent implements OnInit {

  /** Lista de usuarios a visualizar en pantalla */
  public usuarios: Array<UsuarioDTO>;

  /** DTO que se utiliza para la creacion del Usuario */
  public usuarioCrear: UsuarioDTO;

  /** Se utiliza para encapsular los modulos seleccionados */
  public selectedModulos: string[];

  /**
   * DTO que contiene los datos del cliente autenticado o
   * es el cliente asociados al usuario autenticado
   */
  private clienteCurrent: ClienteDTO;

  /**
   * @param adminUsuarioService, se utiliza para consumir
   * los servicios relacionados al Usuario
   */
  constructor(
    private adminUsuarioService: AdminUsuarioService) {
    super();
  }

  /**
   * Se debe consultar los Usuarios cuando se crea el componente
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Metodo que soporta el proceso de creacion del Usuario
   */
  public crearUsuario(): void {
    if (this.usuarioCrear.nombre &&
        this.usuarioCrear.usuarioIngreso) {
      console.log(this.selectedModulos);
    }
  }

  /**
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a consultar los
   * Usuarios parametrizados en el sistema
   */
  private init(): void {
    // se procede a obtener el cliente autenticado
    this.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // se consulta los usuarios asociados al cliente autenticado
    this.adminUsuarioService.getUsuariosCliente(this.clienteCurrent).subscribe(
      data => {
        this.usuarios = data;
      },
      error => {}
    );
  }

  /**
   * Metodo que soporta el evento click del boton
   * Registrar Usuario del panel lista usuario
   */
  public showPanelCrearUsuario(): void {
    this.usuarioCrear = new UsuarioDTO();
    this.selectedModulos = [];
    this.cleanSubmit();
  }

  /**
   * Metodo que soporta el evento click del boton
   * Regresar del panel de creacion de usuario
   */
  public closePanelCrearUsuario(): void {
    this.usuarioCrear = null;
    this.selectedModulos = null;
  }
}
