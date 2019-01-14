import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ConfiguracionesService } from './../../../services/configuraciones.service';
import { CorrespondenciaService } from './../../../services/correspondencia.service';
import { CommonComponent } from './../../../util/common.component';
import { ShellState } from '../../../states/shell/shell.state';
import { SpinnerState } from '../../../states/spinner.state';
import { StepsModel } from './../../../model/steps-model';
import { ModalData } from '../../../model/modal-data';
import { CampoEntradaDetalleDTO } from './../../../dtos/correspondencia/campo-entrada-detalle.dto';
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
  providers: [ ConfiguracionesService, CorrespondenciaService ]
})
export class SolicitarConsecutivosComponent extends CommonComponent implements OnInit, OnDestroy {

  /** cliente autenticado o es el cliente asociado al usuario */
  private clienteCurrent: ClienteDTO;

  /** Backup de las nomenclaturas consultadas */
  public nomenclaturasOrigen: Array<NomenclaturaDTO>;

  /** Son las nomenclaturas a mostrar en pantalla */
  public nomenclaturasView: Array<NomenclaturaDTO>;

  /** Son los campos asociados a la nomenclatura seleccionada */
  public campos: Array<CampoEntradaDetalleDTO>;

  /** Es el filter ingresado para la busqueda de nomenclatura */
  public filterValue: string;

  /** Es la nomenclatura seleccionada para solicitar el consecutivo */
  public nomenclaturaSel: NomenclaturaDTO;

  /** Se utiliza para identificar si es la misma nomenclatura del paso 1 */
  private idNomeclaturaSel: number;

  /** Se utiliza para validar los valores de los inputs*/
  public regex: RegexUtil;

  /** Modelo del componente steps para la solicitud del consecutivo*/
  public stepsModel: StepsModel;

  /** Contiene el modelo del modal ver detalle de la nomenclatura*/
  public detalleNomenclatura: ModalData;

  /** Es el modelo de la tabla de nomenclaturas*/
  @ViewChild('tblNomen') tblNomen: Table;

  /**
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param configuracionesService, Se utiliza para consultar
   * las nomenclatura que tiene el cliente autenticado
   *
   * @param correspondenciaService, contiene los servicios
   * del modulo de correspondencia
   *
   * @param shellState, se utiliza para el titulo del componente
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   */
  constructor(
    protected messageService: MessageService,
    private configuracionesService: ConfiguracionesService,
    private correspondenciaService: CorrespondenciaService,
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
    this.configuracionesService.getNomenclaturas(this.clienteCurrent.id).subscribe(
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
   *
   * @param nomenclatura , nomenclatura seleccionada para ver el detalle
   */
  public verDetalleNomenclatura(event, nomenclatura: NomenclaturaDTO): void {
    this.correspondenciaService.getDetalleNomenclatura(nomenclatura.id).subscribe(
      data => {
        if (!this.detalleNomenclatura) {
          this.detalleNomenclatura = new ModalData();
        }
        this.detalleNomenclatura.showModal(data);
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );

    // es para la progacion del evento
    event.stopPropagation();
  }

  /**
   * Metodo que permite soportar el evento filter por nomenclatura
   */
  public busquedaNomenclatura(): void {

    // el valor del filtro no puede ser indefinido
    if (this.filterValue && this.filterValue.length > 0) {

      // se crea la instancia de la lista nomenclaturas a visualizar
      this.nomenclaturasView = new Array<NomenclaturaDTO>();

      // se busca la nomenclatura que coincide con el valor
      for (const nomenclatura of this.nomenclaturasOrigen) {
        if (nomenclatura.nomenclatura &&
            nomenclatura.nomenclatura.toUpperCase().includes(this.filterValue.toUpperCase())) {
            this.nomenclaturasView.push(nomenclatura);
        }
      }
    } else {
      this.nomenclaturasView = this.nomenclaturasOrigen;
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

    // se verifica que no sea la misma nomenclatura seleccionada
    if (this.idNomeclaturaSel &&
        this.idNomeclaturaSel === this.nomenclaturaSel.id) {
        this.stepsModel.irSegundoStep(this.spinnerState);
        return;
    }

    // se procede a buscar los campos asociados a la nomenclatura seleccionada
    this.correspondenciaService.getCamposNomenclatura(this.nomenclaturaSel.id).subscribe(
      data => {
        this.campos = data;
        this.idNomeclaturaSel = this.nomenclaturaSel.id;
        this.stepsModel.irSegundoStep();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }
}
