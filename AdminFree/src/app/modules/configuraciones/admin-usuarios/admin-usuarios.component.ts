import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfiguracionesService } from '../../../services/configuraciones.service';
import { CommonComponent } from './../../../util/common.component';
import { ShellState } from './../../../states/shell/shell.state';
import { SpinnerState } from './../../../states/spinner.state';
import { LocalStoreUtil } from './../../../util/local-store.util';
import { MsjUtil } from './../../../util/messages.util';
import { UsuarioEdicionDTO } from './../../../dtos/configuraciones/usuario-edicion.dto';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';
import { ClienteDTO } from './../../../dtos/configuraciones/cliente.dto';
import { GenerarTokenIngresoDTO } from '../../../dtos/configuraciones/generar-token-ingreso.dto';
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
  providers: [ ConfiguracionesService ]
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

  /** Se utiliza para hacer el backup para la creacion*/
  private usuarioCrearOrigen: UsuarioDTO;

  /** Se utiliza para hacer el backup para la edicion*/
  public usuarioEditarOrigen: UsuarioEdicionDTO;

  /** Esta es la variable que se utiliza para la creacion o edicion del usuario*/
  public usuarioCU: UsuarioDTO;

  /** Se utiliza para ver el detalle de un Usuario*/
  public userVerDetalle: UsuarioDTO;

  /** permite visualizar el modal de ver detalle del User*/
  public isModalVerDetalle: boolean;

  /** Se utiliza para encapsular los modulos seleccionados */
  public selectedModulos: ModulosCheck;

  /** Modelo del componente steps, se utiliza para la creacion o edicion*/
  public stepsModel: StepsModel;

  /** Se utilizan para mostrar la clave generada para el usuario seleccionado*/
  public claveGenerada: string;
  public txtClaveGenerada: string;

  /** Constantes que representan los identificadores de ACTIVO e INACTIVO */
  public ID_ACTIVO = EstadoConstant.ID_ACTIVO;
  public ID_INACTIVO = EstadoConstant.ID_INACTIVO;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para el cambio
   * de estado y generacion de contrasenia
   *
   * @param configuracionesService, se utiliza para consumir
   * los servicios relacionados al admin Usuario
   *
   * @param shellState, se utiliza para el titulo del componente
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   */
  constructor(
    protected messageService: MessageService,
    private confirmationService: ConfirmationService,
    private configuracionesService: ConfiguracionesService,
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
   * Se procede a consultar los usuarios parametrizados
   * en el sistema relacionados al cliente autenticado
   */
  private init(): void {

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = LabelsConstant.TITLE_ADMIN_USERS;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_ADMIN_USER;

    // se procede a obtener el cliente autenticado
    this.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // se consulta los usuarios asociados al cliente autenticado
    this.configuracionesService.getUsuariosCliente(this.clienteCurrent).subscribe(
      data => {
        this.usuarios = data;
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
        this.configuracionesService.modificarEstadoUsuario(usuarioUpdate).subscribe(
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

    // se limpia la clave generada anterior
    this.limpiarCLaveGenerada();

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.GENERAR_CLAVE_CONFI.replace('?1', usuario.nombre),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // si el usuario acepta la ventana de confirmacion
        const parametro = new GenerarTokenIngresoDTO();
        parametro.idUsuario = usuario.id;

        // se procede a generar una nueva clave de ingreso
        this.configuracionesService.generarClaveIngreso(parametro).subscribe(
          data => {
            this.txtClaveGenerada = MsjFrontConstant.GENERAR_CLAVE_EXITOSO.replace('?1', usuario.nombre);
            this.claveGenerada = data.token;
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que permite limpiar los datos de la clave generada
   * cerrando la ventana de informacion visualizada en pantalla
   */
  public limpiarCLaveGenerada(): void {
    this.messageService.clear();
    this.txtClaveGenerada = null;
    this.claveGenerada = null;
  }

  /**
   * Metodo que soporta el proceso de creacion del Usuario
   */
  public crearUsuario(): void {

    // se construye los datos a enviar para la creacion
    this.setDatosAntesCreacion();

    // se hace el llamado HTTP para la creacion del usuario
    this.configuracionesService.crearUsuario(this.usuarioCU).subscribe(
      data => {
        // se agrega el nuevo usuario en la lista como primer item
        this.usuarios.unshift(data);

        // se muestra el mensaje exitoso mostrando la clave del usuario
        this.txtClaveGenerada = MsjFrontConstant.USER_CREADO.replace('?1', this.usuarioCU.nombre);
        this.claveGenerada = data.claveIngreso;

        // se limpian los datos del usuario ingresado
        this.limpiarCamposCU();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que soporta el proceso de edicion del Usuario
   */
  public editarUsuario(): void {

    // solo aplica si hay alguna modificacion
    if (this.usuarioEditarOrigen.datosBasicosEditar || this.usuarioEditarOrigen.modulosEditar) {

      // se construye los datos a enviar para la creacion
      const usuarioBK = this.usuarioEditarOrigen.usuario;
      this.setDatosAntesEdicion();

      // se hace el llamado HTTP para la edicion del usuario
      this.configuracionesService.editarUsuario(this.usuarioEditarOrigen).subscribe(
        data => {
          // Mensaje exitoso campo modificado
          this.messageService.add(MsjUtil.getToastSuccessMedium(MsjFrontConstant.USER_ACTUALIZADO_EXITOSO));

          // datos basicos modificados
          if (this.usuarioEditarOrigen.datosBasicosEditar) {
            usuarioBK.nombre = this.usuarioCU.nombre;
            usuarioBK.cargo = this.usuarioCU.cargo;
            usuarioBK.usuarioIngreso = this.usuarioCU.usuarioIngreso;
          }

          // modulos modificados
          if (this.usuarioEditarOrigen.modulosEditar) {
            usuarioBK.modulosTokens = this.usuarioCU.modulosTokens;
          }

          // se limpian los datos del usuario ingresado
          this.limpiarCamposCU();
        },
        error => {
          this.usuarioEditarOrigen.usuario = usuarioBK;
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    }
  }

  /**
   * Metodo que soporta el evento click del boton ver detalle del User
   */
  public showModalVerDetalle(user: UsuarioDTO): void {

    // se configura los modulos asignados del usuario seleccionado
    this.initSelectedModulos();
    this.selectedModulos.setModulosAsignados(user.modulosTokens);

    // se asigna usuario seleccionado para ver detalle y se muestra el modal
    this.userVerDetalle = user;
    this.isModalVerDetalle = true;
  }

  /**
   * Metodo que es invocado cuando se cierra el modal de ver detalle
   */
  public closeModalVerDetalle(): void {
    this.userVerDetalle = null;
  }

  /**
   * Metodo que soporta el evento click del boton
   * Registrar Usuario del panel lista usuario
   */
  public showPanelCreacion(): void {

    // se limpia los mensajes anteriores
    this.limpiarCLaveGenerada();

    // se define el usuario que permite visualizar el panel
    this.usuarioCU = new UsuarioDTO();
    this.usuarioCU.cliente = this.clienteCurrent;

    // se utiliza para identificar los modulos seleccionados
    this.initSelectedModulos();

    // se define el componente steps para la creacion
    this.stepsModel = new StepsModel();
    this.stepsModel.stepsParaAdminUsers();

    // se visualiza el panel
    this.isCreacion = true;
  }

  /**
   * Metodo que soporta el evento del boton editar el campo
   *
   * @param user , usuario seleccionado para editar
   */
  public showPanelEdicion(user: UsuarioDTO): void {

    // se limpia los mensajes anteriores
    this.limpiarCLaveGenerada();

    // se hace el backup de los atributos
    this.usuarioEditarOrigen = new UsuarioEdicionDTO();
    this.usuarioEditarOrigen.usuario = user;
    this.usuarioCU = JSON.parse(JSON.stringify(user));

    // se configura los modulos asignados para el usuario edicion
    this.initSelectedModulos();
    this.selectedModulos.setModulosAsignados(user.modulosTokens);

    // se define el componente steps para la edicion
    this.stepsModel = new StepsModel();
    this.stepsModel.stepsParaAdminUsers();

    // se visualiza el panel
    this.isEdicion = true;
  }

  /**
   * Es el evento del boton siguiente para el paso (Datos del User)
   */
  public siguienteDatosUser(): void {
    if (this.isCreacion) {
      this.siguienteDatosUserCreacion();
    } else {
      this.siguienteDatosUserEdicion();
    }
  }

  /**
   * Es el evento del boton siguiente para el paso (modulos)
   */
  public siguienteModulos(): void {
    if (this.isCreacion) {
      this.siguienteModulosCreacion();
    } else {
      this.siguienteModulosEdicion();
    }
  }

  /**
   * Metodo que permite cerrar el panel de creacion o edicion usuarios
   */
  public closePanelCU(): void {

    // para creacion se pregunta directamente
    if (this.isCreacion) {
      this.confirmationService.confirm({
        message: MsjFrontConstant.SEGURO_SALIR,
        header: MsjFrontConstant.CONFIRMACION,
        accept: () => {
          this.messageService.clear();
          this.limpiarCamposCU();
        }
      });
    } else {
        // si hay modificaciones se muestra el modal confirmacion
        if (this.usuarioEditarOrigen.datosBasicosEditar ||
            this.usuarioEditarOrigen.modulosEditar) {
          this.confirmationService.confirm({
            message: MsjFrontConstant.SEGURO_SALIR_EDICION,
            header: MsjFrontConstant.CONFIRMACION,
            accept: () => {
              this.messageService.clear();
              this.limpiarCamposCU();
            }
          });
      } else {
        this.messageService.clear();
        this.limpiarCamposCU();
      }
    }
  }

  /**
   * Metodo que permite organizar los datos antes de la creacion del usuario
   */
  private setDatosAntesCreacion(): void {
    this.usuarioCU.modulosTokens = this.selectedModulos.getSeleccionados();
  }

  /**
   * Metodo que permite organizar los datos antes de la edicion del usuario
   */
  private setDatosAntesEdicion(): void {

    // se configuran los modulos seleccionados si fueron modificados
    this.usuarioCU.modulosTokens = null;
    if (this.usuarioEditarOrigen.modulosEditar) {
      this.usuarioCU.modulosTokens = this.selectedModulos.getSeleccionados();
    }

    // se configura el usuario modificado
    this.usuarioEditarOrigen.usuario = this.usuarioCU;
  }

  /**
   * Es el evento del boton siguiente para el paso (Datos del User) creacion
   */
  private siguienteDatosUserCreacion(): void {

    // se limpian los espacios
    this.usuarioCU.nombre = this.setTrim(this.usuarioCU.nombre);
    this.usuarioCU.usuarioIngreso = this.setTrim(this.usuarioCU.usuarioIngreso);
    this.usuarioCU.cargo = this.setTrim(this.usuarioCU.cargo);

    // si valida si se modifico el usuario de ingreso
    if (this.usuarioCrearOrigen &&
        this.usuarioCrearOrigen.usuarioIngreso === this.usuarioCU.usuarioIngreso) {
        this.stepsModel.irSegundoStep(this.spinnerState);
        return;
    }

    // se procede a validar los datos ingresados para la creacion
    this.configuracionesService.validarDatosUsuario(this.usuarioCU).subscribe(
      data => {
        // se crea el clone por si regresan a este punto de la creacion
        this.usuarioCrearOrigen = new UsuarioDTO();
        this.usuarioCrearOrigen.usuarioIngreso = this.usuarioCU.usuarioIngreso;

        // se procede a seguir al segundo paso
        this.stepsModel.irSegundoStep();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Es el evento del boton siguiente para el paso (Datos del User) edicion
   */
  private siguienteDatosUserEdicion(): void {

    // se limpia la bandera que permite editar los valores
    this.usuarioEditarOrigen.datosBasicosEditar = false;

    // se obtiene el origen de los datos del usuario
    const userOrigen = this.usuarioEditarOrigen.usuario;

    // se limpian los espacios
    this.usuarioCU.nombre = this.setTrim(this.usuarioCU.nombre);
    this.usuarioCU.usuarioIngreso = this.setTrim(this.usuarioCU.usuarioIngreso);
    this.usuarioCU.cargo = this.setTrim(this.usuarioCU.cargo);

    // se valida si se modifico algun dato
    if (userOrigen.nombre !== this.usuarioCU.nombre ||
        userOrigen.cargo !== this.usuarioCU.cargo ||
        userOrigen.usuarioIngreso !== this.usuarioCU.usuarioIngreso) {

      // se indica que los datos fueron modificados
      this.usuarioEditarOrigen.datosBasicosEditar = true;

      // se llama la validacion si el user ingreso fue modificado
      if (userOrigen.usuarioIngreso !== this.usuarioCU.usuarioIngreso) {

        // se procede a validar el usuario de ingreso
        this.configuracionesService.validarDatosUsuario(this.usuarioCU).subscribe(
          data => {
            this.stepsModel.irSegundoStep();
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
        return;
      }
    }
    this.stepsModel.irSegundoStep(this.spinnerState);
  }

  /**
   * Es el evento del boton siguiente para el paso (modulos) Creacion
   */
  public siguienteModulosCreacion(): void {

    // los modulos son requeridos
    if (!this.selectedModulos.tieneModuloSeleccionado()) {
      this.messageService.add(MsjUtil.getToastError(MsjFrontConstant.MODULOS_REQUERIDOS));
      return;
    }

    // se procede a ir al ultimo paso
    this.stepsModel.irUltimoStep(this.spinnerState);
  }

  /**
   * Es el evento del boton siguiente para el paso (modulos) Edicion
   */
  public siguienteModulosEdicion(): void {

    // los modulos son requeridos
    if (!this.selectedModulos.tieneModuloSeleccionado()) {
      this.messageService.add(MsjUtil.getToastError(MsjFrontConstant.MODULOS_REQUERIDOS));
      return;
    }

    // se inicializa como modulos modificadas
    this.usuarioEditarOrigen.modulosEditar = true;

    // se obtiene el origen de los datos del usuario
    const userOrigen = this.usuarioEditarOrigen.usuario;

    // se obtiene los modulos seleccionados
    const seleccionados = this.selectedModulos.getSeleccionados();

    // se valida si hay alguna modificacion
    if (userOrigen.modulosTokens.length === seleccionados.length) {
      this.usuarioEditarOrigen.modulosEditar = false;
      for (const editada of seleccionados) {
        if (!userOrigen.modulosTokens.includes(editada)) {
          this.usuarioEditarOrigen.modulosEditar = true;
          break;
        }
      }
    }
    this.stepsModel.irUltimoStep(this.spinnerState);
  }

  /**
   * Permite limpiar los datos utilizado para la creacion o edicion del usuario
   */
  private limpiarCamposCU(): void {
    this.usuarioCU = null;
    this.usuarioCrearOrigen = null;
    this.usuarioEditarOrigen = null;
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
