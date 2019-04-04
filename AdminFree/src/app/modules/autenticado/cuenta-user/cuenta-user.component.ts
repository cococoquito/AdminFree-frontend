import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfiguracionesService } from './../../../services/configuraciones.service';
import { CommonComponent } from './../../../util/common.component';
import { UserAccountST } from './../../../states/shell/shell-states/user-account.st';
import { ShellState } from './../../../states/shell/shell.state';
import { SpinnerState } from '../../../states/spinner.state';
import { CambioUsuarioIngresoDTO } from '../../../dtos/configuraciones/cambio-usuario-ingreso.dto';
import { CambioClaveDTO } from './../../../dtos/configuraciones/cambio-clave.dto';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';
import { MsjUtil } from './../../../util/messages.util';
import { LabelsConstant } from './../../../constants/labels.constant';
import { MsjFrontConstant } from './../../../constants/messages-frontend.constant';

/**
 * Componente para la administracion de la cuenta de usuario autenticado en el sistema
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './cuenta-user.component.html',
  providers: [ ConfiguracionesService ]
})
export class CuentaUserComponent extends CommonComponent implements OnInit, OnDestroy {

  /** Estado de la cuenta del usuario */
  public userAccount: UserAccountST;

  /** DTO que se utiliza para la modificacion de los datos personales */
  public datosPersonales: UsuarioDTO;

  /** DTO que se utiliza para la modificacion del password */
  public cambioClave: CambioClaveDTO;

  /** DTO que se utiliza para la modificacion del usuario de ingreso */
  public cambioUsuario: CambioUsuarioIngresoDTO;

  /** Se utiliza para habilitar el boton de 'Aplicar Cambios' de los datos personales */
  public isDatosPersonalesModificado: boolean;

  /** Indica si el usuario dio submit al boton cambiar clave o usuario ingreso */
  public isSubmitDone: boolean;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para la confirmacion
   * de algun cambio de la cuenta de usuario
   *
   * @param configuracionesService, se utiliza para consumir
   * los servicios relacionados a este proceso de negocio
   *
   * @param shellState, se utiliza para el titulo del componente
   * y para obtener los datos del usuario autenticado
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * pasa del panel de datos personales a modificar clave o usuario
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
   * Se inicializa las variables globales
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
   * del componente, donde se procede a inicializar
   * las variables globales
   */
  private init(): void {

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = LabelsConstant.MENU_CUENTA_USER;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_ADMIN_CUENTA_USER;

    // se obtiene los datos de la cuenta de autenticacion
    this.userAccount = this.shellState.userAccount;

    // Esta funcionalidad no aplica para el Administrador
    if (this.userAccount.credenciales.administrador) {
      setTimeout(() => { this.messageService.add(MsjUtil.getMsjError(MsjFrontConstant.ADMIN_NO_APLICA)); }, 100);
      return;
    }

    // DTO para la modificacion de los datos personales
    this.setDatosPersonalesModificar();
  }

  /**
   * Metodo que soporta el evento click del boton 'Aplicar Cambios'
   * de los datos personales, invocando el servicio para su modificacion
   */
  public modificarDatosPersonales(): void {

    // solo aplica si hay modificaciones
    if (this.isDatosPersonalesModificado) {

      // se limpian los espacios en blanco
      this.datosPersonales.nombre = this.setTrimFilter(this.datosPersonales.nombre);
      this.datosPersonales.cargo = this.setTrimFilter(this.datosPersonales.cargo);

      // ambos datos son requeridos
      if (this.datosPersonales.nombre && this.datosPersonales.cargo) {
        // TO-DO
      }
    }
  }

  /**
   * Metodo que soporta el evento click del boton 'Modificar Contrasenia'
   * invocando el servicio para su modificacion
   */
  public modificarClave(): void {

    // se indica que ya se dio submit
    this.isSubmitDone = true;

    // todos los campos son requeridos
    if (this.cambioClave.claveActual && this.cambioClave.claveNueva && this.cambioClave.claveVerificacion) {

      // se muestra la ventana de confirmacion
      this.confirmationService.confirm({
      message: MsjFrontConstant.CAMBIAR_CLAVE_INGRESO,
      header: MsjFrontConstant.CONFIRMACION,
        accept: () => {

        }
      });
    }
  }

  /**
   * Metodo que soporta el evento click del boton 'Modificar Usuario Ingreso'
   * invocando el servicio para su modificacion
   */
  public modificarUsuarioIngreso(): void {

    // se indica que ya se dio submit
    this.isSubmitDone = true;

    // todos los campos son requeridos y el nuevo usuario debe ser modificado
    if (this.cambioUsuario.claveActual && this.cambioUsuario.usuario &&
        this.cambioUsuario.usuario !== this.datosPersonales.usuarioIngreso) {

      // se muestra la ventana de confirmacion
      this.confirmationService.confirm({
      message: MsjFrontConstant.CAMBIAR_USER_INGRESO,
      header: MsjFrontConstant.CONFIRMACION,
        accept: () => {

        }
      });
    }
  }

  /**
   * Metodo que es invocando cuando algun cambio de los datos personales ocurre
   */
  public changedDatosPersonales(): void {

    // se inicializa como no mofificado
    this.isDatosPersonalesModificado = false;

    // se toman los valores y se limpia los espacios en blanco
    const nombre = this.setTrimFilter(this.datosPersonales.nombre);
    const cargo = this.setTrimFilter(this.datosPersonales.cargo);

    // se verifica si el Nombre o el Cargo fueron modificado
    if (nombre && cargo) {
      if (nombre !== this.userAccount.usuario.nombre) {
        this.isDatosPersonalesModificado = true;
      } else if (cargo !== this.userAccount.usuario.cargo) {
        this.isDatosPersonalesModificado = true;
      }
    }
  }

  /**
   * Metodo que permite abrir el panel para cambiar la contrasenia
   */
  public abrirPanelCambioClave(): void {
    this.spinnerState.displaySpinner();
    setTimeout(() => {
      this.cambioClave = new CambioClaveDTO();
      this.spinnerState.hideSpinner();
    }, 100);
  }

  /**
   * Metodo que permite abrir el panel para cambiar el usuario de ingreso
   */
  public abrirPanelCambioUsuario(): void {
    this.spinnerState.displaySpinner();
    setTimeout(() => {
      this.cambioUsuario = new CambioUsuarioIngresoDTO();
      this.spinnerState.hideSpinner();
    }, 100);
  }

  /**
   * Metodo que permite cerrar el panel de cambio contrasenia o usuario
   */
  public cerrarPanelCambioClaveUsuario(): void {
    this.spinnerState.displaySpinner();
    setTimeout(() => {
      this.cambioClave = null;
      this.cambioUsuario = null;
      this.isSubmitDone = false;
      this.spinnerState.hideSpinner();
    }, 100);
  }

  /**
   * Metodo que permite crear el DTO para la modificacion de los datos personales
   */
  private setDatosPersonalesModificar(): void {
    this.datosPersonales = new UsuarioDTO();
    this.datosPersonales.nombre = this.userAccount.usuario.nombre;
    this.datosPersonales.cargo = this.userAccount.usuario.cargo;
    this.datosPersonales.usuarioIngreso = this.userAccount.usuario.usuarioIngreso;
    this.datosPersonales.id = this.userAccount.usuario.id;
  }
}
