import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../../services/correspondencia.service';
import { CommonComponent } from '../../../../util/common.component';
import { SolicitarConsecutivoState } from '../../../../states/correspondencia/solicitar-consecutivo.state';
import { SpinnerState } from '../../../../states/spinner.state';
import { CampoModel } from '../../../../model/campo-model';
import { SolicitudConsecutivoDTO } from '../../../../dtos/correspondencia/solicitud-consecutivo.dto';
import { RegexUtil } from '../../../../util/regex-util';
import { MsjUtil } from '../../../../util/messages.util';
import { BusinessUtil } from '../../../../util/business-util';
import { LabelsConstant } from '../../../../constants/labels.constant';

/**
 * Componente para el ingreso de informacion de acuerdo
 * a la nomenclatura seleccionada en el paso 1 de solicitar
 * consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-ingreso-informacion',
  templateUrl: './ingreso-informacion.component.html',
  styleUrls: ['./ingreso-informacion.component.css']
})
export class IngresoInformacionComponent extends CommonComponent implements OnInit {

  /** Se utiliza para validar los valores de los inputs*/
  public regex: RegexUtil;

  /** labels para el componente de los calendars */
  public CALENDAR_SPANISH = LabelsConstant.CALENDAR_SPANISH;

  /**
   * @param state, estado para administrar los datos para las
   * solicitudes de los consecutivos de correspondencia
   *
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param correspondenciaService, contiene los servicios
   * del modulo de correspondencia
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   */
  constructor(
    public state: SolicitarConsecutivoState,
    protected messageService: MessageService,
    private correspondenciaService: CorrespondenciaService,
    private spinnerState: SpinnerState) {
    super();
  }

  /**
   * Metodo que define las variables globales
   */
  ngOnInit() {
    this.init();
  }

  /**
   * Metodo que permite soportar el boton siguiente
   */
  public siguiente(): void {

    // se limpia mensajes de otros procesos
    this.messageService.clear();

    // se hace el llamado de las validaciones por parte de FRONT-END
    const resultado = BusinessUtil.isValoresConsecutivoValido(
      this.state.camposInformacionValues,
      this.regex,
      this.messageService,
      this.state.datosIniciales.fechaActual);

    // se verifica que todo este OK
    if (resultado) {

      // se hace el llamado de las validaciones por parte del BACK-END
      const valores = BusinessUtil.getCamposValidarBackEnd(this.state.camposInformacionValues);
      if (valores && valores.length > 0) {

        // se construye la solicitud para hacer la invocacion
        const solicitud = new SolicitudConsecutivoDTO();
        solicitud.valores = valores;
        solicitud.idCliente = this.state.clienteCurrent.id;
        solicitud.idNomenclatura = this.state.nomenclaturaSeleccionada.id;

        // se procede a realizar las validaciones para los valores ingresado
        this.correspondenciaService.validarCamposIngresoInformacion(solicitud).subscribe(
          data => {
            // se valida si el resultado tiene mensajes de errores
            if (data && data.length > 0) {

              // se muestra cada error por pantalla
              for (const error of data) {
                this.messageService.add(MsjUtil.getMsjError(error.mensaje));
              }
            } else {
              // si no tiene se procede a ir al tercer paso
              this.state.stepsModel.irTercerStep();
            }
          },
          error => {
            this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
          }
        );
      } else {
        this.state.stepsModel.irTercerStep(this.spinnerState);
      }
    }
  }

  /**
   * Metodo que permite configurar las variables iniciales
   */
  private init(): void {

    // se define las variables globales
    this.regex = new RegexUtil();

    // se configura el modelo de los campos
    this.setCamposModel();
  }

  /**
   * Metodo que permite configurar el model de los campos
   */
  private setCamposModel(): void {

    // se valida si se los campos ya fueron consultados
    if (!this.state.noConsultarCamposIngreso) {

      // se procede a buscar los campos asociados a la nomenclatura seleccionada
      this.correspondenciaService.getCamposNomenclatura(this.state.nomenclaturaSeleccionada.id).subscribe(
        data => {

          // indica que los campos de informacion ya fueron consultados
          this.state.noConsultarCamposIngreso = true;

          // se valida si para la nomenclatura seleccionada existen campos
          if (data && data.length > 0) {

            // se crea los campos a visualizar en pantalla
            this.state.camposInformacionValues = new Array<CampoModel>();

            // se recorre todos los campos
            let campoModel;
            for (const campo of data) {

              // se crea el modelo del campo
              campoModel = new CampoModel();
              campoModel.initSolicitar(campo, this.state.datosIniciales.fechaActual);

              // se agrega a la lista a visualizar
              this.state.camposInformacionValues.push(campoModel);
            }
          }
        },
        error => {
          this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
        }
      );
    }
  }
}
