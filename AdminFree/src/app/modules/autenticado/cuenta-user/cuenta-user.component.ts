import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CuentaUserService } from './../../../services/cuenta-user.service';
import { CommonComponent } from './../../../util/common.component';
import { UserAccountST } from './../../../states/shell/shell-states/user-account.st';
import { ShellState } from './../../../states/shell/shell.state';
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

  /** Contiene los datos de la cuenta */
  public userAccount: UserAccountST;

  /** nombre del usuario autenticado */
  public nombre: string;

  /** usuario de ingreso del usuario autenticado */
  public usuarioIngreso: string;

  public soloLecturaCuenta: boolean;
  public soloLecturaClave: boolean;
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
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cuentaUserService: CuentaUserService,
    private shellState: ShellState) {
    super();
  }

  /**
   * Se configura el titulo del componente
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
    this.shellState.title.subTitulo =
    'Submódulo de seguridad que permite <strong>modificar los datos de la cuenta</strong> del usuario autenticado';

    // se obtiene los datos de la cuenta de autenticacion
    this.userAccount = this.shellState.userAccount;

    // Esta funcionalidad no aplica para el Administrador
    if (this.userAccount.credenciales.administrador) {
      setTimeout(() => {
        this.messageService.add(MsjUtil.getMsjError(MsjFrontConstant.ADMIN_NO_APLICA));
      }, 100);
    } else {
      this.nombre = this.userAccount.usuario.nombre;
      this.usuarioIngreso = this.userAccount.usuario.usuarioIngreso;
      this.soloLecturaCuenta = true;
      this.soloLecturaClave = true;
      this.isPanelClaveClose = true;
    }
  }

  public habilitarEdicionCuenta(): void {
    this.soloLecturaCuenta = !this.soloLecturaCuenta;
  }

  public habilitarEdicionClave(): void {
    this.soloLecturaClave = !this.soloLecturaClave;
  }
  public prueba() {
    this.isPanelClaveClose = !this.isPanelClaveClose;
    console.log('invocado');
  }
}
