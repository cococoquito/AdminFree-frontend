import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfiguracionesService } from './../../../services/configuraciones.service';
import { CommonComponent } from './../../../util/common.component';
import { UserAccountST } from './../../../states/shell/shell-states/user-account.st';
import { ShellState } from './../../../states/shell/shell.state';
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
  styleUrls: ['./cuenta-user.component.css'],
  providers: [ ConfiguracionesService ]
})
export class CuentaUserComponent extends CommonComponent implements OnInit, OnDestroy {

  /** Estado de la cuenta del usuario */
  public userAccount: UserAccountST;

  /** DTO que se utiliza para la modificacion de los datos personales */
  public datosPersonales: UsuarioDTO;

  /** DTO que se utiliza para la modificacion del password */
  public cambioClave: CambioClaveDTO;

  /** Se utiliza para habilitar el boton de 'Aplicar Cambios' de los datos personales */
  public isDatosPersonalesModificado;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para la confirmacion
   * de algun cambio de la cuenta de usuario
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
    private configuracionesService: ConfiguracionesService,
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

    // DTO para la modificacion de los datos personales
    this.setDatosPersonalesModificar();

    // DTO para la modificacion de la contrasenia
    this.cambioClave = new CambioClaveDTO();
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
        
      }
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
