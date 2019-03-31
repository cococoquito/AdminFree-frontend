import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../../services/correspondencia.service';
import { ConfiguracionesService } from '../../../../services/configuraciones.service';
import { SolicitarConsecutivoState } from '../../../../states/correspondencia/solicitar-consecutivo.state';
import { ShellState } from '../../../../states/shell/shell.state';
import { SpinnerState } from '../../../../states/spinner.state';
import { CommonComponent } from '../../../../util/common.component';
import { NomenclaturaDTO } from '../../../../dtos/configuraciones/nomenclatura.dto';
import { LocalStoreUtil } from '../../../../util/local-store.util';
import { MsjUtil } from '../../../../util/messages.util';
import { VentanaModalModel } from '../../../../model/ventana-modal.model';
import { StepsModel } from '../../../../model/steps-model';
import { LabelsConstant } from '../../../../constants/labels.constant';
import { ModulesTokenConstant } from '../../../../constants/modules-token.constant';

/**
 * Componente para la solicitud de consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  templateUrl: './solicitar-consecutivos.component.html',
  styleUrls: ['./solicitar-consecutivos.component.css'],
  providers: [ CorrespondenciaService, ConfiguracionesService, SolicitarConsecutivoState ]
})
export class SolicitarConsecutivosComponent extends CommonComponent implements OnInit, OnDestroy {

  /** Son las nomenclaturas a mostrar en pantalla */
  public nomenclaturas: Array<NomenclaturaDTO>;

  /** se utiliza para visualizar el detalle de la nomenclatura*/
  public verDetalleNomenclatura: VentanaModalModel;

  /** Es el filter ingresado para la busqueda de nomenclatura */
  public filterValue: string;

  /** Token del modulo de correspondencia */
  public TK_CORRESPONDENCIA = ModulesTokenConstant.TK_CORRESPONDENCIA;

  /** Es el identificador de la nomenclatura seleccionada, por si regresan al 1 punto */
  private idNomenclaturaBK;

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
   * @param configuracionesService, se utiliza para ver el
   * detalle de la nomenclatura seleccionada
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
    private configuracionesService: ConfiguracionesService,
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
        // la fecha llega como string se debe hacer la conversion
        if (data.fechaActual) {
          data.fechaActual = new Date(data.fechaActual);
        }
        this.state.datosIniciales = data;
        this.nomenclaturas = data.nomenclaturas;
        this.setStyleNomenclaturas();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
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
  }

  /**
   * Metodo que soporta el evento click del boton siguiente
   */
  public siguiente(nomenclatura: NomenclaturaDTO): void {

    // se limpia mensajes de otros procesos
    this.messageService.clear();

    // se configura la nomenclatura seleccionada
    this.state.nomenclaturaSeleccionada = nomenclatura;

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

  /**
   * Metodo que soporta el evento click del boton ver detalle
   *
   * @param event , se utiliza para no propagar el evento y asi evitar
   * que no seleccionen la nomenclatura para ir al siguiente paso
   *
   * @param nomenclatura , nomenclatura seleccionada para ver el detalle
   */
  public showVerDetalleNomenclatura(event, nomenclatura: NomenclaturaDTO): void {
    this.configuracionesService.getDetalleNomenclatura(nomenclatura.id).subscribe(
      data => {
        if (!this.verDetalleNomenclatura) {
          this.verDetalleNomenclatura = new VentanaModalModel();
        }
        this.verDetalleNomenclatura.showModal(data);
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
    event.stopPropagation();
  }

  /**
   * Metodo que permite configurar el estilo para las nomenclaturas
   */
  private setStyleNomenclaturas(): void {

    // se valida que si existan nomenclaturas parametrizadas
    if (this.nomenclaturas && this.nomenclaturas.length > 0) {

      // son los estilos de cada color
      const azul = 'azul';
      const morado = 'morado';
      const verde = 'verde';
      const naranja = 'naranja';

      // se recorre cada nomenclatura
      let index = 1;
      let colorBK;
      for (const nomenclatura of this.nomenclaturas) {

        // colores pares
        if (index % 2 === 0) {
          if (colorBK && colorBK === azul) {
              nomenclatura.bgColor = morado;
              colorBK = morado;
          } else {
            nomenclatura.bgColor = naranja;
            colorBK = naranja;
          }
        } else {
          // colores impares
          if (colorBK && colorBK === morado) {
              nomenclatura.bgColor = verde;
              colorBK = verde;
          } else {
            nomenclatura.bgColor = azul;
            colorBK = azul;
          }
        }
        index = index + 1;
      }
    }
  }
}
