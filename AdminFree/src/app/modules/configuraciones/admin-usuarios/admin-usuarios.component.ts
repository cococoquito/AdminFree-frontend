import { Component, OnInit } from '@angular/core';
import { CommonComponent } from './../../../util/common.component';
import { AdminUsuarioService } from './../../../services/admin-usuario.service';
import { MessagesState } from './../../../states/messages.state';
import { LocalStoreUtil } from './../../../util/local-store.util';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';
import { MessagesFrontendConstant } from './../../../constants/messages-frontend.constant';
import { ModulesTokenConstant } from './../../../constants/modules-token.constant';

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

  /** bandera que se utiliza para la visualizacion del modal de creacion user */
  public isModalCrearUsuario: boolean;

  /**
   * DTO que contiene los datos del cliente autenticado o
   * es el cliente asociados al usuario autenticado
   */
  private clienteCurrent: ClienteDTO;

  /**
   * @param messagesState, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param adminUsuarioService, se utiliza para consumir
   * los servicios relacionados al Usuario
   */
  constructor(
    private messagesState: MessagesState,
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
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a consultar los
   * Usuarios parametrizados en el sistema
   */
  private init(): void {
    // se limpia los mensajes de otros componentes
    this.messagesState.clean();

    // se procede a obtener el cliente autenticado
    this.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // se consulta los usuarios asociados al cliente autenticado
    this.adminUsuarioService.getUsuariosCliente(this.clienteCurrent).subscribe(
      data => {
        this.usuarios = data;
      },
      error => {
        this.messagesState.showError(MessagesFrontendConstant.ERROR, this.showMensajeError(error));
      }
    );
  }

  /**
   * Metodo que es invocado antes de dar submit en el formulario creacion
   */
  public beforeOnSubmit(): boolean {
    this.messagesState.clean();
    return this.onSubmit();
  }

  /**
   * Metodo que es es llamado antes de crear el usuario
   */
  public beforeCrearUsuario(): boolean {
    // el modal se inicializa como visualizado
    this.isModalCrearUsuario = true;

    // programacion defensiva para nombre, usuario ingreso
    if (!this.usuarioCrear.nombre || !this.usuarioCrear.usuarioIngreso) {
        this.isModalCrearUsuario = false;
    }

    // se valida si seleccionaron modulos para el nuevo usuario
    if (!this.selectedModulos || this.selectedModulos.length === 0) {
        // se muestra el mensaje de error y el modal no se debe mostrar
        this.messagesState.showError(MessagesFrontendConstant.ERROR_VALIDACION, MessagesFrontendConstant.MODULOS_USER);
        this.isModalCrearUsuario = false;
    }
    return this.isModalCrearUsuario;
  }

  /**
   * Metodo que soporta el proceso de creacion del Usuario
   */
  public crearUsuario(): void {
    // se construye los datos a enviar para la creacion
    this.prepararDatosAntesCreacion();

    // se hace el llamado HTTP para la creacion del usuario
    this.adminUsuarioService.crearUsuario(this.usuarioCrear).subscribe(
      data => {
        // se agrega el nuevo usuario en la lista visualizada en pantalla
        this.usuarios.push(data);

        // se muestra el mensaje exitoso mostrando la contraseña del user
        this.messagesState.showSuccess(
          MessagesFrontendConstant.EXITOSO,
          MessagesFrontendConstant.USER_CREADO + '<strong>' + data.claveIngreso + '</strong>'
        );

        // se limpian los datos del usuario ingresado
        this.initPanelCrearUsuario();

        // se cierra el modal de confirmacion creacion usuario
        this.isModalCrearUsuario = false;
      },
      error => {
        this.messagesState.showError(MessagesFrontendConstant.ERROR, this.showMensajeError(error));
        this.isModalCrearUsuario = false;
      }
    );
  }

  /**
   * Metodo que soporta el evento click del boton
   * Registrar Usuario del panel lista usuario
   */
  public showPanelCrearUsuario(): void {
    this.messagesState.clean();
    this.initPanelCrearUsuario();
  }

  /**
   * Metodo que soporta el evento click del boton
   * Regresar del panel de creacion de usuario
   */
  public closePanelCrearUsuario(): void {
    this.messagesState.clean();
    this.usuarioCrear = null;
    this.selectedModulos = null;
  }

  /**
   * Metodo que es es llamado para cerrar el modal de crear usuario
   */
  public closeModalCrearUsuario(): void {
    this.isModalCrearUsuario = false;
  }

  /**
   * Metodo que permite configurar los datos del nuevo
   * usuario antes de la creacion
   */
  private prepararDatosAntesCreacion(): void {
    // se configura los datos basicos
    this.usuarioCrear.cliente = this.clienteCurrent;
    this.usuarioCrear.nombre = this.setTrim(this.usuarioCrear.nombre);
    this.usuarioCrear.usuarioIngreso = this.setTrim(this.usuarioCrear.usuarioIngreso);

    // se configura los modulos
    const modulos: Array<string> = new Array<string>();
    for (const idModulo of this.selectedModulos) {
      switch (idModulo) {
        case '1': {
          modulos.push(ModulesTokenConstant.TK_CORRESPONDENCIA);
          break;
        }
        case '2': {
          modulos.push(ModulesTokenConstant.TK_ARCHIVO_GESTION);
          break;
        }
        case '3': {
          modulos.push(ModulesTokenConstant.TK_REPORTES);
          break;
        }
        case '4': {
          modulos.push(ModulesTokenConstant.TK_CONFIGURACIONES);
          break;
        }
      }
    }
    this.usuarioCrear.modulosTokens = modulos;
  }

  /**
   * Metodo que permite inicializar el panel de creacion de usuarios
   */
  private initPanelCrearUsuario() {
    this.usuarioCrear = new UsuarioDTO();
    this.selectedModulos = [];
    this.cleanSubmit();
  }
}
