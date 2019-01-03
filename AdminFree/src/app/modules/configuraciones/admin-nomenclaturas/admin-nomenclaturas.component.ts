import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminNomenclaturaService } from '../../../services/admin-nomenclatura.service';
import { CommonComponent } from '../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { SpinnerState } from '../../../states/spinner.state';
import { NomenclaturaDTO } from '../../../dtos/configuraciones/nomenclatura.dto';
import { ClienteDTO } from '../../../dtos/configuraciones/cliente.dto';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { MsjUtil } from '../../../util/messages.util';
import { LabelsConstant } from '../../../constants/labels.constant';

/**
 * Componente para la administracion de las Nomenclaturas
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './admin-nomenclaturas.component.html',
  styleUrls: ['./admin-nomenclaturas.component.css'],
  providers: [AdminNomenclaturaService]
})
export class AdminNomenclaturasComponent extends CommonComponent implements OnInit, OnDestroy {

  /** cliente autenticado o es el cliente asociado al usuario */
  private clienteCurrent: ClienteDTO;

  /** Lista de nomenclaturas asociado al cliente */
  public nomenclaturas: Array<NomenclaturaDTO>;

  /** Bandera que indica si el proceso es creacion */
  public isCreacion: boolean;

  /** Bandera que indica si el proceso es edicion */
  public isEdicion: boolean;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, se utiliza para mostrar el
   * modal de confirmacion para diferente procesos
   *
   * @param service, se utiliza para consumir
   * los servicios relacionados a este proceso negocio
   *
   * @param shellState, se utiliza para el titulo del componente
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   */
  constructor(protected messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: AdminNomenclaturaService,
    private shellState: ShellState,
    private spinnerState: SpinnerState) {
    super();
  }

  /**
   * Se debe consultar las nomenclaturas asociados al cliente autenticado
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
   * del componente, donde se procede a consultar las
   * nomenclaturas relacionado al cliente autenticado
   */
  private init(): void {

    // se configura el titulo y subtitulo de la pagina
    this.shellState.title.titulo = LabelsConstant.TITLE_ADMIN_NOMENCLATURAS;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_ADMIN_CAMPOS;

    // se procede a obtener el cliente autenticado
    this.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // se consulta las nomenclaturas asociados al cliente autenticado
    this.service.getNomenclaturas(this.clienteCurrent.id).subscribe(
      data => {
        this.nomenclaturas = data;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }
}
