import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AdminNomenclaturaService } from '../../../services/admin-nomenclatura.service';
import { CommonComponent } from './../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { SpinnerState } from '../../../states/spinner.state';
import { StepsModel } from './../../../model/steps-model';
import { NomenclaturaDTO } from '../../../dtos/configuraciones/nomenclatura.dto';
import { ClienteDTO } from '../../../dtos/configuraciones/cliente.dto';
import { MsjUtil } from '../../../util/messages.util';
import { RegexUtil } from './../../../util/regex-util';
import { LocalStoreUtil } from '../../../util/local-store.util';
import { LabelsConstant } from '../../../constants/labels.constant';
import { MsjFrontConstant } from '../../../constants/messages-frontend.constant';

/**
 * Componente para la solicitud de consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './solicitar-consecutivos.component.html',
  styleUrls: ['./solicitar-consecutivos.component.css'],
  providers: [ AdminNomenclaturaService ]
})
export class SolicitarConsecutivosComponent extends CommonComponent implements OnInit, OnDestroy {

  /** cliente autenticado o es el cliente asociado al usuario */
  private clienteCurrent: ClienteDTO;

  /** Backup de las nomenclaturas consultadas */
  public nomenclaturasOrigen: Array<NomenclaturaDTO>;

  /** Son las nomenclaturas a mostrar en pantalla */
  public nomenclaturasView: Array<NomenclaturaDTO>;

  /** Es la nomenclatura seleccionada para solicitar el consecutivo */
  public nomenclaturaSel: NomenclaturaDTO;

  /** Se utiliza para validar los valores de los inputs*/
  public regex: RegexUtil;

  /** Modelo del componente steps para la solicitud del consecutivo*/
  public stepsModel: StepsModel;

  /** Es el modelo de la tabla de nomenclaturas*/
  @ViewChild('tblNomen') tblNomen: Table;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param adminNomenclaturaService, Se utiliza para consultar
   * las nomenclatura que tiene el cliente autenticado
   *
   * @param shellState, se utiliza para el titulo del componente
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   */
  constructor(
    protected messageService: MessageService,
    private adminNomenclaturaService: AdminNomenclaturaService,
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
    this.shellState.title.titulo = LabelsConstant.TITLE_SOLICITAR_CONSECUTIVOS;
    this.shellState.title.subTitulo = LabelsConstant.SUBTITLE_SOLICITAR_CONSECUTIVOS;

    // se procede a obtener el cliente autenticado
    this.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    /** Se utiliza para validar los valores de los inputs*/
    this.regex = new RegexUtil();

    // se configura el componente steps
    this.stepsModel = new StepsModel();
    this.stepsModel.stepsParaSolicitarConsecutivo();

    // se consulta las nomenclaturas asociados al cliente autenticado
    this.adminNomenclaturaService.getNomenclaturas(this.clienteCurrent.id).subscribe(
      data => {
        this.nomenclaturasOrigen = data;
        this.nomenclaturasView = data;
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que soporta el evento click del boton ver detalle nomenclatura
   *
   * @param event , se utiliza para no propagar el evento y asi evitar
   * que seleccione o deseleccione la fila de la tabla de nomenclatura
   */
  public verDetalleNomenclatura(event): void {
    event.stopPropagation();
  }

  /**
   * Metodo que permite soportar el evento filter por nomenclatura
   *
   * @param event , contiene el valor ingresado
   */
  public busquedaNomenclatura(event: any): void {

    // se crea la instancia de la lista nomenclaturas a visualizar
    this.nomenclaturasView = new Array<NomenclaturaDTO>();

    // es el nuevo valor ingresado
    const value = event.target.value;

    // se busca la nomenclatura que coincide con el valor
    for (const nomenclatura of this.nomenclaturasOrigen) {
        if (nomenclatura.nomenclatura &&
            nomenclatura.nomenclatura.toUpperCase().includes(value.toUpperCase())) {
            this.nomenclaturasView.push(nomenclatura);
        }
    }

    // se refresca la tabla de nomenclaturas
    this.tblNomen.reset();
  }

  /**
   * Metodo que soporta el evento del boton siguiente de nomenclatura
   */
  public siguienteNomenclatura(): void {

    // la seleccion de la nomenclatura es obligatorio
    if (!this.nomenclaturaSel) {
      this.messageService.add(MsjUtil.getToastError(MsjFrontConstant.NOMENCLATURA_REQUERIDO));
      return;
    }
  }
}
