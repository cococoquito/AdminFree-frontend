import { Component, OnInit } from '@angular/core';
import { CommonComponent } from './../../../util/common.component';
import { ConfirmationService } from 'primeng/api';
import { AdminUsuarioService } from './../../../services/admin-usuario.service';
import { MessagesState } from './../../../states/messages.state';
import { LocalStoreUtil } from './../../../util/local-store.util';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';
import { MessagesFrontendConstant } from './../../../constants/messages-frontend.constant';
import { ModulesTokenConstant } from './../../../constants/modules-token.constant';
import { EstadoConstant } from './../../../constants/estado.constant';

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
   *
   * @param confirmationService, se utiliza para el cambio
   * de estado y generacion de contrasenia
   */
  constructor(
    private messagesState: MessagesState,
    private adminUsuarioService: AdminUsuarioService,
    private confirmationService: ConfirmationService) {
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
   * Metodo que permite soportar el proceso de negocio
   * de cambiar el estado de usuario ACTIVO/INACTIVO
   *
   * @param usuario a cambiar su estado
   */
  public cambiarEstadoUsuario(usuario: UsuarioDTO): void {
    // se inicializa como usuario ACTIVO
    let idEstado = EstadoConstant.ID_INACTIVO;
    let estadoMsj = 'INACTIVAR';

    // si el usuario esta inactivo se debe ACTIVAR
    if (usuario.estado === EstadoConstant.ID_INACTIVO) {
        idEstado = EstadoConstant.ID_ACTIVO;
        estadoMsj = 'ACTIVAR';
    }

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MessagesFrontendConstant.CAMBIAR_ESTADO_USER.replace('?1', estadoMsj).replace('?2', usuario.nombre),
      header: MessagesFrontendConstant.CONFIRMACION,
      accept: () => {

        // si el usuario acepta la ventana de confirmacion
        const usuarioUpdate: UsuarioDTO = new UsuarioDTO();
        usuarioUpdate.id = usuario.id;
        usuarioUpdate.estado = idEstado;

        // se procede a modificar el estado del usuario
        this.adminUsuarioService.modificarEstadoUsuario(usuarioUpdate).subscribe(
          data => {
            usuario.estado = idEstado;
            usuario.estadoNombre = EstadoConstant.getNombreEstado(idEstado);
          },
          error => {
            this.messagesState.showError(MessagesFrontendConstant.ERROR, this.showMensajeError(error)
            );
          }
        );
      }
    });
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
   * Metodo que es invocado antes de dar submit en el formulario creacion
   */
  public beforeOnSubmit(): boolean {
    this.messagesState.clean();
    return this.onSubmit();
  }

  /**
   * Metodo que permite validar si se debe mostrar el modal de creacion
   */
  public showModalCrearUsuario(): void {
    // el modal se inicializa como visualizado
    this.isModalCrearUsuario = true;

    // programacion defensiva para nombre, usuario ingreso
    if (!this.usuarioCrear.nombre || !this.usuarioCrear.usuarioIngreso) {
        this.isModalCrearUsuario = false;
    }

    // se valida si seleccionaron modulos para el nuevo usuario
    if (!this.selectedModulos || this.selectedModulos.length === 0) {
        this.messagesState.showError(MessagesFrontendConstant.ERROR_VALIDACION, MessagesFrontendConstant.MODULOS_USER);
        this.isModalCrearUsuario = false;
    }
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
