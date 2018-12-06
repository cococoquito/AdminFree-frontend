import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CuentaUserService } from './../../../services/cuenta-user.service';
import { CommonComponent } from './../../../util/common.component';
import { UserAccountST } from './../../../states/shell/shell-states/user-account.st';
import { ShellState } from './../../../states/shell/shell.state';
import { CambioClaveDTO } from './../../../dtos/configuraciones/cambio-clave.dto';
import { UsuarioDTO } from './../../../dtos/seguridad/usuario.dto';
import { MsjUtil } from './../../../util/messages.util';
import { LabelsConstant } from './../../../constants/labels.constant';
import { MsjFrontConstant } from './../../../constants/messages-frontend.constant';

/**
 * Componente para la administracion de la cuenta
 * del usuario autenticado en el sistema
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './cuenta-user.component.html',
  styleUrls: ['./cuenta-user.component.css'],
  providers: [CuentaUserService]
})
export class CuentaUserComponent extends CommonComponent implements OnInit, OnDestroy {

  /** Estado de la cuenta del usuario */
  public userAccount: UserAccountST;

  /** DTO que se utiliza para la modificacion de la cuenta del user */
  public datosUserModificar: UsuarioDTO;

  /** DTO que se utiliza para la modificacion del password */
  public cambioClave: CambioClaveDTO;

  /** Bandera que indica si el panel datos cuenta esta en modo solo lectura */
  public soloLecturaCuenta: boolean;

  /** Bandera que indica si el panel modificar constrasenia esta en modo solo lectura */
  public soloLecturaClave: boolean;

  /** Se utiliza para el toogle de los paneles */
  public isPanelClaveClose: boolean;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para la confirmacion
   * de algun cambio de la cuenta del usuario
   *
   * @param cuentaUserService, se utiliza para consumir
   * los servicios relacionados a este proceso de negocio
   *
   * @param shellState, se utiliza para el titulo del componente
   * y para obtener los datos del usuario autenticado
   */
  constructor(
    protected messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cuentaUserService: CuentaUserService,
    private shellState: ShellState) {
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

    // Se crear el DTO para la modificacion de la cuenta del usuario
    this.setDatosUserModificar();

    // DTO para la modificacion de la constrasenia
    this.cambioClave = new CambioClaveDTO();

    // se inicializa los paneles como solo lectura
    this.soloLecturaCuenta = true;
    this.soloLecturaClave = true;

    // el panel de clave se inicializa cerrado
    this.isPanelClaveClose = true;
  }

  /**
   * Metodo que permite modificar los datos de la Cuenta
   * soporta el evento click del boton aplicar cambios
   */
  public modificarDatosCuenta(): void {

    // se eliminan los espacios en blanco inicio - final
    this.datosUserModificar.nombre = this.setTrim(this.datosUserModificar.nombre);
    this.datosUserModificar.usuarioIngreso = this.setTrim(this.datosUserModificar.usuarioIngreso);

    // se valida si hay alguna modificacion en los datos de la cuenta
    if (this.datosUserModificar.nombre === this.userAccount.usuario.nombre &&
        this.datosUserModificar.usuarioIngreso === this.userAccount.usuario.usuarioIngreso) {
        this.soloLecturaCuenta = true;
        return;
    }

    // se valida si el usuario de ingreso fue modificado
    this.datosUserModificar.userIngresoModificado = false;
    if (this.datosUserModificar.usuarioIngreso !== this.userAccount.usuario.usuarioIngreso) {
        this.datosUserModificar.userIngresoModificado = true;
    }

    // se muestra la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.CAMBIAR_DATOS_CUENTA_USER,
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se procede a modificar los datos de la cuenta
        this.cuentaUserService.modificarDatosCuenta(this.datosUserModificar).subscribe(
          data => {
            // se notifica el cambios de los datos en el shell de la aplicacion
            this.shellState.userAccount.usuario.nombre = this.datosUserModificar.nombre;
            this.shellState.userAccount.usuario.usuarioIngreso = this.datosUserModificar.usuarioIngreso;

            // Se crea el DTO para la modificacion de la cuenta del usuario
            this.setDatosUserModificar();

            // se desactiva el panel de la cuenta del user
            this.soloLecturaCuenta = true;

            // se muestra el mensaje exitoso en pantalla
            this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.DATOS_CUENTA_ACTUALIZADO));
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que soporta el evento click del boton
   * para habilitar le edicion del panel cuenta user
   */
  public habilitarEdicionPanelCuenta(formCuenta): void {

    // se cambia la bandera solo lectura del panel
    this.soloLecturaCuenta = !this.soloLecturaCuenta;

    // se limpia los mensajes anteriores
    this.messageService.clear();

    // se reinicia el submitted del formulario de la cuenta
    formCuenta.submitted = false;

    // si se desactiva el panel se deja los datos originales
    if (this.soloLecturaCuenta) {
      this.setDatosUserModificar();
    }
  }

  /**
   * Metodo que soporta el evento click del boton
   * para habilitar le edicion del panel contrasenia
   */
  public habilitarEdicionPanelClave(): void {
    this.soloLecturaClave = !this.soloLecturaClave;
  }

  /**
   * Se utiliza para abrir y cerrar los paneles de
   * modificar cuenta user y contrasenia
   */
  public togglePaneles() {
    this.isPanelClaveClose = !this.isPanelClaveClose;
  }

  /**
   * Metodo que permite crear el DTO para configurar
   * los datos de la cuenta del usuario
   */
  private setDatosUserModificar(): void {
    this.datosUserModificar = new UsuarioDTO();
    this.datosUserModificar.nombre = this.userAccount.usuario.nombre;
    this.datosUserModificar.usuarioIngreso = this.userAccount.usuario.usuarioIngreso;
    this.datosUserModificar.id = this.userAccount.usuario.id;
  }
}
