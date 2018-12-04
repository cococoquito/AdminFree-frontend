import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonComponent } from './../../../util/common.component';
import { AdminUsuarioService } from './../../../services/admin-usuario.service';
import { ShellState } from './../../../states/shell/shell.state';
import { LocalStoreUtil } from './../../../util/local-store.util';
import { MsjUtil } from './../../../util/messages.util';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';
import { MsjFrontConstant } from './../../../constants/messages-frontend.constant';
import { ModulesTokenConstant } from './../../../constants/modules-token.constant';
import { EstadoConstant } from './../../../constants/estado.constant';
import { LabelsConstant } from './../../../constants/labels.constant';

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
export class AdminUsuariosComponent extends CommonComponent implements OnInit, OnDestroy {

  /** Lista de usuarios a visualizar en pantalla */
  public usuarios: Array<UsuarioDTO>;

  /** DTO que se utiliza para la creacion del Usuario */
  public usuarioCrear: UsuarioDTO;

  /** Se utiliza para encapsular los modulos seleccionados */
  public selectedModulos: string[];

  /** bandera que se utiliza para la visualizacion del modal de creacion user */
  public isModalCrearUsuario: boolean;

  /** bandera que se utiliza para la visualizacion del modal de edicion de modulos */
  public isModalEdicionModulos: boolean;

  /** DTO que se utiliza para la edicion de los modulos */
  public usuarioEdicionModulos: UsuarioDTO;

  /**
   * DTO que contiene los datos del cliente autenticado o
   * es el cliente asociados al usuario autenticado
   */
  private clienteCurrent: ClienteDTO;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para el cambio
   * de estado y generacion de contrasenia
   *
   * @param adminUsuarioService, se utiliza para consumir
   * los servicios relacionados al Usuario
   *
   * @param shellState, se utiliza para el titulo del componente
   */
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private adminUsuarioService: AdminUsuarioService,
    private shellState: ShellState) {
    super();
  }

  /**
   * Se debe consultar los Usuarios cuando se crea el componente
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Se utiliza para limpiar los mensajes visualizados pantalla
   */
  ngOnDestroy(): void {
    this.messageService.clear();
  }

  /**
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a consultar los
   * Usuarios parametrizados en el sistema
   */
  private init(): void {

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = LabelsConstant.MENU_ADMIN_USERS;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_ADMIN_USER;

    // se procede a obtener el cliente autenticado
    this.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // se consulta los usuarios asociados al cliente autenticado
    this.adminUsuarioService.getUsuariosCliente(this.clienteCurrent).subscribe(
      data => {
        this.usuarios = data;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
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
        this.messageService.add(MsjUtil.getMsjSuccess(
          MsjFrontConstant.USER_CREADO + '<strong>' + data.claveIngreso + '</strong>'));

        // se limpian los datos del usuario ingresado
        this.initPanelCrearUsuario();

        // se cierra el modal de confirmacion creacion usuario
        this.isModalCrearUsuario = false;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        this.isModalCrearUsuario = false;
      }
    );
  }

  /**
   * Metodo que permite soportar el proceso de negocio
   * de cambiar el estado de usuario ACTIVO/INACTIVO
   */
  public cambiarEstadoUsuario(usuario: UsuarioDTO): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

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
      message: MsjFrontConstant.CAMBIAR_ESTADO_USER.replace('?1', estadoMsj).replace('?2', usuario.nombre),
      header: MsjFrontConstant.CONFIRMACION,
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
            this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.USUARIO_ACTUALIZADO));
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que soporta el proceso de negocio de crear
   * una nueva constrasenia para el usuario seleccionado
   */
  public generarNuevaClave(usuario: UsuarioDTO): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.GENERAR_CLAVE_CONFI.replace('?1', usuario.nombre),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // si el usuario acepta la ventana de confirmacion
        const usuarioClave: UsuarioDTO = new UsuarioDTO();
        usuarioClave.id = usuario.id;

        // se procede a generar una nueva clave de ingreso
        this.adminUsuarioService.generarClaveIngreso(usuarioClave).subscribe(
          data => {
            this.messageService.add(MsjUtil.getMsjInfo(
              MsjFrontConstant.GENERAR_CLAVE_EXITOSO.replace('?1', usuario.nombre).replace('?2', data.clave)
            ));
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que permite soportar el evento de edicion de modulos
   */
  public editarModulos(): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // se obtiene los modulos seleccionados
    const modulos: Array<string> = this.getModulosSeleccionados();

    // se verifica si es valido la edicion
    if (!this.isValidoEdicionModulos(modulos)) {
      this.closeModalEdicionModulos();
      return;
    }

    // se construye los datos para ser enviado
    const usuarioModificar = new UsuarioDTO();
    usuarioModificar.modulosTokens = modulos;
    usuarioModificar.id = this.usuarioEdicionModulos.id;

    // se procede a modificar los privilegios del usuario
    this.adminUsuarioService.modificarPrivilegiosUsuario(usuarioModificar).subscribe(
      data => {
        // se actualiza los modulos para el usuario seleccionado
        this.usuarioEdicionModulos.modulosTokens = modulos;

        // se cierra el modal de edicion de modulos
        this.closeModalEdicionModulos();

        // se muestra el toast del usuario actualizado
        this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.USUARIO_ACTUALIZADO));
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que soporta el evento click del boton
   * Registrar Usuario del panel lista usuario
   */
  public showPanelCrearUsuario(): void {
    this.messageService.clear();
    this.initPanelCrearUsuario();
  }

  /**
   * Metodo que soporta el evento click del boton
   * Regresar del panel de creacion de usuario
   */
  public closePanelCrearUsuario(): void {
    this.messageService.clear();
    this.usuarioCrear = null;
    this.selectedModulos = null;
  }

  /**
   * Metodo que es invocado antes de dar submit en el formulario creacion
   */
  public beforeOnSubmit(): boolean {
    this.messageService.clear();
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
        this.messageService.add(MsjUtil.getMsjErrorValidacion(MsjFrontConstant.MODULOS_USER));
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
   * Metodo que es es llamado para abrir el modal de edicion de modulos
   */
  public showModalEdicionModulos(userSeleccionado: UsuarioDTO): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // se configura el usuario seleccionado para la edicion
    this.usuarioEdicionModulos = userSeleccionado;

    // se visualiza el modal de edicion
    this.isModalEdicionModulos = true;

    // se configura los modulos que tiene el usuario en formato
    // que pueda se leido por los values de los check del componente
    this.setModulosSeleccionados(userSeleccionado.modulosTokens);
  }

  /**
   * Metodo que es es llamado para cerrar el modal de edicion de modulos
   */
  public closeModalEdicionModulos(): void {
    this.isModalEdicionModulos = false;
    this.usuarioEdicionModulos = null;
    this.selectedModulos = null;
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
    this.usuarioCrear.modulosTokens = this.getModulosSeleccionados();
  }

  /**
   * Metodo que permite configurar los modulos seleccionados
   * para el proceso de creacion de usuario o edicion de modulos
   */
  private getModulosSeleccionados(): Array<string> {

    // contendra los modulos seleccionados
    const modulos: Array<string> = new Array<string>();

    // solo aplica si hay modulos seleccionados
    if (this.selectedModulos && this.selectedModulos.length > 0) {
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
    }
    return modulos;
  }

  /**
   * Metodo que permite configurar los ids de los modulos
   * asignados a un usuario especifico
   */
  private setModulosSeleccionados(modulos: Array<string>): void {

    // esta lista es la que apunta el componente
    this.selectedModulos = [];

    // se recorren todos los token asignados a un usuario
    for (const token of modulos) {
      switch (token) {
        case ModulesTokenConstant.TK_CORRESPONDENCIA: {
          this.selectedModulos.push('1');
          break;
        }
        case ModulesTokenConstant.TK_ARCHIVO_GESTION: {
          this.selectedModulos.push('2');
          break;
        }
        case ModulesTokenConstant.TK_REPORTES: {
          this.selectedModulos.push('3');
          break;
        }
        case ModulesTokenConstant.TK_CONFIGURACIONES: {
          this.selectedModulos.push('4');
          break;
        }
      }
    }
  }

  /**
   * Metodo que permite validar si hay alguna modificacion
   * para la edicion de los modulos del usuario seleccionado
   */
  private isValidoEdicionModulos(modulos: Array<string>): boolean {
    let isValido = true;

    // los modulos son requeridos para la edicion
    if (!modulos || modulos.length === 0) {
      this.messageService.add(MsjUtil.getToastError(MsjFrontConstant.MODULOS_REQUERIDOS));
      isValido = false;
    } else {
      // se valida si hay alguna modificacion
      if (modulos.length === this.usuarioEdicionModulos.modulosTokens.length) {
        isValido = false;
        for (const token of this.usuarioEdicionModulos.modulosTokens) {
          if (!modulos.includes(token)) {
            isValido = true;
            break;
          }
        }
      }
    }
    return isValido;
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
