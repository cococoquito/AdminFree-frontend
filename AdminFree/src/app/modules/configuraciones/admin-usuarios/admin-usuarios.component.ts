import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonComponent } from './../../../util/common.component';
import { AdminUsuarioService } from './../../../services/admin-usuario.service';
import { ShellState } from './../../../states/shell/shell.state';
import { SpinnerState } from './../../../states/spinner.state';
import { LocalStoreUtil } from './../../../util/local-store.util';
import { MsjUtil } from './../../../util/messages.util';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';
import { StepsModel } from './../../../model/steps-model';
import { ModulosCheck } from '../../../model/modulos-check';
import { MsjFrontConstant } from './../../../constants/messages-frontend.constant';
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

  /** cliente autenticado o es el cliente asociado al usuario */
  private clienteCurrent: ClienteDTO;

  /** Lista de usuarios a visualizar en pantalla */
  public usuarios: Array<UsuarioDTO>;

  /** Bandera que indica si el proceso es creacion */
  public isCreacion: boolean;

  /** Bandera que indica si el proceso es edicion */
  public isEdicion: boolean;

  /** Se utiliza para hacer le backup para la creacion o modificacion*/
  private usuarioOrigen: UsuarioDTO;

  /** Esta es la variable que se utiliza para la creacion o edicion del usuario*/
  public usuarioCU: UsuarioDTO;

  /** Se utiliza para encapsular los modulos seleccionados */
  public selectedModulos: ModulosCheck;

  /** DTO que se utiliza para la edicion de los modulos */
  public usuarioEdicionModulos: UsuarioDTO;

  /** Modelo del componente steps, se utiliza para la creacion o edicion*/
  public stepsModel: StepsModel;

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
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   */
  constructor(
    protected messageService: MessageService,
    private confirmationService: ConfirmationService,
    private adminUsuarioService: AdminUsuarioService,
    private shellState: ShellState,
    private spinnerState: SpinnerState) {
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
    this.adminUsuarioService.crearUsuario(this.usuarioCU).subscribe(
      data => {
        // se agrega el nuevo usuario en la lista visualizada en pantalla
        this.usuarios.push(data);

        // se muestra el mensaje exitoso mostrando la contraseña del user
        this.messageService.add(MsjUtil.getMsjSuccess(
          MsjFrontConstant.USER_CREADO + '<strong>' + data.claveIngreso + '</strong>'));

        // se limpian los datos del usuario ingresado
        this.limpiarCamposCU();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
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

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se define el usuario que permite visualizar el panel
    this.usuarioCU = new UsuarioDTO();

    // se utiliza para identificar los modulos seleccionados
    this.initSelectedModulos();

    // se define el componente steps para la creacion
    this.stepsModel = new StepsModel();
    this.stepsModel.stepsParaAdminUsers();

    // se visualiza el panel
    this.isCreacion = true;
  }

  /**
   * Es el evento del boton siguiente para el paso (Datos del User)
   */
  public siguienteDatosUser(): void {

    // se limpian los espacios
    this.usuarioCU.nombre = this.setTrim(this.usuarioCU.nombre);
    this.usuarioCU.usuarioIngreso = this.setTrim(this.usuarioCU.usuarioIngreso);

    // si no hay ningun cambio solamente se pasa al segundo paso
    if (this.usuarioOrigen &&
        this.usuarioOrigen.nombre === this.usuarioCU.nombre &&
        this.usuarioOrigen.usuarioIngreso === this.usuarioCU.usuarioIngreso) {
        this.stepsModel.irSegundoStep(this.spinnerState);
        return;
    }

    // se procede a validar los datos ingresados para la creacion
    this.adminUsuarioService.validarDatosUsuario(this.usuarioCU).subscribe(
      data => {
        // se crea el clone por si regresan a este punto de la creacion
        this.usuarioOrigen = new UsuarioDTO();
        this.usuarioOrigen.nombre = this.usuarioCU.nombre;
        this.usuarioOrigen.usuarioIngreso = this.usuarioCU.usuarioIngreso;

        // se procede a seguir al segundo paso
        this.stepsModel.irSegundoStep();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que es es llamado para abrir el modal de edicion de modulos
   */
  public showModalEdicionModulos(userSeleccionado: UsuarioDTO): void {

    // se limpia los mensajes de otros procesos
    this.messageService.clear();

    // se configura el usuario seleccionado para la edicion
    this.usuarioEdicionModulos = userSeleccionado;
  }

  /**
   * Metodo que es es llamado para cerrar el modal de edicion de modulos
   */
  public closeModalEdicionModulos(): void {
    this.usuarioEdicionModulos = null;
    this.selectedModulos = null;
  }

  /**
   * Metodo que permite cerrar el panel de creacion o edicion usuarios
   */
  public closePanelCU(): void {

    // para creacion se pregunta directamente
    this.confirmationService.confirm({
      message: MsjFrontConstant.SEGURO_SALIR,
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {
        this.messageService.clear();
        this.limpiarCamposCU();
      }
    });
  }

  /**
   * Metodo que permite configurar los datos del nuevo
   * usuario antes de la creacion
   */
  private prepararDatosAntesCreacion(): void {

    // se configura los datos basicos
    this.usuarioCU.cliente = this.clienteCurrent;

    // se configura los modulos
    this.usuarioCU.modulosTokens = this.getModulosSeleccionados();
  }

  /**
   * Metodo que permite configurar los modulos seleccionados
   * para el proceso de creacion de usuario o edicion de modulos
   */
  private getModulosSeleccionados(): Array<string> {

    // contiene los token de los modulos seleccionados
    const seleccionados: Array<string> = new Array<string>();

    // se recorre todos los modulos para identificar cual fue seleccionados
    for (const modulo of this.selectedModulos.modulos) {
      if (modulo.aplica) {
        seleccionados.push(modulo.token);
      }
    }
    return seleccionados;
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
   * Permite limpiar los datos utilizado para la creacion o edicion del usuario
   */
  private limpiarCamposCU(): void {
    this.usuarioCU = null;
    this.usuarioOrigen = null;
    this.stepsModel = null;
    this.isCreacion = false;
    this.isEdicion = false;
  }

  /**
   * Permite inicializar los modulos para ser seleccionados
   */
  private initSelectedModulos(): void {
    if (!this.selectedModulos) {
      this.selectedModulos = new ModulosCheck();
      this.selectedModulos.init();
    } else {
      this.selectedModulos.clean();
    }
  }
}
