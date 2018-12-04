import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CuentaUserService } from './../../../services/cuenta-user.service';
import { CommonComponent } from './../../../util/common.component';
import { ShellState } from './../../../states/shell/shell.state';
import { LabelsConstant } from './../../../constants/labels.constant';

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
export class CuentaUserComponent extends CommonComponent implements OnInit {

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
   * Metodo que es invocado al momento de la creacion
   * del componente, donde se procede a inicializar
   * las variables globales
   */
  private init(): void {

    // se limpia los mensajes de otros componentes
    this.messageService.clear();

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = LabelsConstant.MENU_CUENTA_USER;
    this.shellState.title.subTitulo = '';
  }
}
