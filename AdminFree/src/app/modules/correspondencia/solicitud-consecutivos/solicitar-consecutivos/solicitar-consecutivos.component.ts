import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../../services/correspondencia.service';
import { SolicitarConsecutivoState } from '../../../../states/correspondencia/solicitar-consecutivo.state';
import { ShellState } from '../../../../states/shell/shell.state';
import { SpinnerState } from '../../../../states/spinner.state';
import { CommonComponent } from '../../../../util/common.component';
import { NomenclaturaDTO } from '../../../../dtos/configuraciones/nomenclatura.dto';
import { LocalStoreUtil } from '../../../../util/local-store.util';
import { MsjUtil } from '../../../../util/messages.util';
import { StepsModel } from '../../../../model/steps-model';
import { ModalData } from '../../../../model/modal-data';
import { MsjFrontConstant } from '../../../../constants/messages-frontend.constant';
import { LabelsConstant } from '../../../../constants/labels.constant';

/**
 * Componente para la solicitud de consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './solicitar-consecutivos.component.html',
  styleUrls: ['./solicitar-consecutivos.component.css'],
  providers: [ CorrespondenciaService, SolicitarConsecutivoState ]
})
export class SolicitarConsecutivosComponent extends CommonComponent implements OnInit, OnDestroy {

  /** Son las nomenclaturas a mostrar en pantalla */
  public nomenclaturas: Array<NomenclaturaDTO>;

  /** Contiene el modelo del modal ver detalle de la nomenclatura*/
  public detalleNomenclatura: ModalData;

  /** Es el filter ingresado para la busqueda de nomenclatura */
  public filterValue: string;

  /** Es el identificador de la nomenclatura seleccionada, por si regresan al 1 punto */
  private idNomenclaturaBK;

  /** Se utiliza para resetear la tabla nomenclatura cuando hacen alguna busqueda*/
  @ViewChild('tblNomen') tblNomen: Table;

  /**
   * @param state, estado para administrar los datos para las
   * solicitudes de creacion de consecutivos de correspondencia
   *
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
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
    public state: SolicitarConsecutivoState,
    protected messageService: MessageService,
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
   * Cuando se destruya el componente se debe limpiar los mensajes
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
    this.state.clienteCurrent = LocalStoreUtil.getCurrentCliente();

    // se configura el componente steps
    this.state.stepsModel = new StepsModel();
    this.state.stepsModel.stepsParaSolicitarConsecutivo();

    // se consulta los datos iniciales para este modulo
    this.correspondenciaService.getInitSolicitarConsecutivo(this.state.clienteCurrent.id).subscribe(
      data => {
        this.state.datosIniciales = data;
        this.nomenclaturas = data.nomenclaturas;
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

    // se para la propagacion del evento
    event.stopPropagation();
  }

  /**
   * Metodo que permite soportar el evento filter por nomenclatura
   */
  public busquedaNomenclatura(): void {

    // el valor del filtro no puede ser indefinido
    if (this.filterValue && this.filterValue.length > 0) {

      // se crea la instancia de la lista nomenclaturas a visualizar
      this.nomenclaturas = new Array<NomenclaturaDTO>();

      // se busca la nomenclatura que coincide con el valor
      for (const nomenclatura of this.state.datosIniciales.nomenclaturas) {
        if (nomenclatura.nomenclatura &&
            nomenclatura.nomenclatura.toUpperCase().includes(this.filterValue.toUpperCase())) {
            this.nomenclaturas.push(nomenclatura);
        }
      }
    } else {
      this.nomenclaturas = this.state.datosIniciales.nomenclaturas;
    }

    // se refresca la tabla de nomenclaturas
    this.tblNomen.reset();
  }

  /**
   * Metodo que soporta el evento click del boton siguiente
   */
  public siguiente(): void {

    // la seleccion de la nomenclatura es obligatorio
    if (!this.state.nomenclaturaSeleccionada) {
      this.messageService.add(MsjUtil.getToastError(MsjFrontConstant.NOMENCLATURA_REQUERIDO));
      return;
    }

    // se identifica que no sea la misma nomenclatura seleccionada
    if (this.idNomenclaturaBK && this.state.nomenclaturaSeleccionada.id === this.idNomenclaturaBK) {

      // se redirecciona segundo paso CON spinner dado que el 2 paso NO procede hacer llamado http
      this.state.stepsModel.irSegundoStep(this.spinnerState);
    } else {

      // se configura el id de la nomenclatura por si regresan a este punto
      this.idNomenclaturaBK = this.state.nomenclaturaSeleccionada.id;

      // se reinicia la data para el paso 2
      this.state.reiniciarPaso2();

      // se redirecciona segundo paso SIN spinner dado que el 2 paso SI procede hacer llamado http
      this.state.stepsModel.irSegundoStep();
    }
  }
}
