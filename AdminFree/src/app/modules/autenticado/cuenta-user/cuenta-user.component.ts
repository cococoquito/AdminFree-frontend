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

    // DTO para la modificacion de la cuenta del usuario
    this.datosUserModificar = new UsuarioDTO();
    this.datosUserModificar.nombre = this.userAccount.usuario.nombre;
    this.datosUserModificar.usuarioIngreso = this.userAccount.usuario.usuarioIngreso;
    this.datosUserModificar.id = this.userAccount.usuario.id;

    // DTO para la modificacion de la constrasenia
    this.cambioClave = new CambioClaveDTO();

    // se inicializa los paneles como solo lectura
    this.soloLecturaCuenta = true;
    this.soloLecturaClave = true;

    // el panel de clave se inicializa cerrado
    this.isPanelClaveClose = true;
  }

  public modificarDatosCuenta(): void {
    this.datosUserModificar.nombre = this.setTrim(
      this.datosUserModificar.nombre
    );
    this.datosUserModificar.usuarioIngreso = this.setTrim(
      this.datosUserModificar.usuarioIngreso
    );

    if (
      this.datosUserModificar.nombre === this.userAccount.usuario.nombre &&
      this.datosUserModificar.usuarioIngreso ===
        this.userAccount.usuario.usuarioIngreso
    ) {
      this.soloLecturaCuenta = true;
      return;
    }

    this.datosUserModificar.userIngresoModificado = false;
    if (
      this.datosUserModificar.usuarioIngreso !==
      this.userAccount.usuario.usuarioIngreso
    ) {
      this.datosUserModificar.userIngresoModificado = true;
    }

    this.cuentaUserService
      .modificarDatosCuenta(this.datosUserModificar)
      .subscribe(
        data => {
          this.shellState.userAccount.usuario.nombre = this.datosUserModificar.nombre;
          this.shellState.userAccount.usuario.usuarioIngreso = this.datosUserModificar.usuarioIngreso;

          this.datosUserModificar = new UsuarioDTO();
          this.datosUserModificar.nombre = this.userAccount.usuario.nombre;
          this.datosUserModificar.usuarioIngreso = this.userAccount.usuario.usuarioIngreso;
          this.datosUserModificar.id = this.userAccount.usuario.id;

          this.soloLecturaCuenta = true;
          this.messageService.add(
            MsjUtil.getToastSuccess(MsjFrontConstant.DATOS_CUENTA_ACTUALIZADO)
          );
        },
        error => {
          this.messageService.add(
            MsjUtil.getMsjError(this.showMensajeError(error))
          );
        }
      );
  }

  public habilitarEdicionCuenta(): void {
    this.soloLecturaCuenta = !this.soloLecturaCuenta;
    this.messageService.clear();

    if (this.soloLecturaCuenta) {
      this.datosUserModificar = new UsuarioDTO();
      this.datosUserModificar.nombre = this.userAccount.usuario.nombre;
      this.datosUserModificar.usuarioIngreso = this.userAccount.usuario.usuarioIngreso;
      this.datosUserModificar.id = this.userAccount.usuario.id;
    }
  }

  public habilitarEdicionClave(): void {
    this.soloLecturaClave = !this.soloLecturaClave;
  }
  public togglePanel() {
    this.isPanelClaveClose = !this.isPanelClaveClose;
  }
}
