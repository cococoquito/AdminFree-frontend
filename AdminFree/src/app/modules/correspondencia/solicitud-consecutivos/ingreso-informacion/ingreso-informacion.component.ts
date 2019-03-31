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
import { FechaUtil } from '../../../../util/fecha-util';
import { BusinessUtil } from '../../../../util/business-util';
import { LabelsConstant } from '../../../../constants/labels.constant';
import { MsjFrontConstant } from '../../../../constants/messages-frontend.constant';

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
    const resultado = this.esInformacionValida();

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

  /**
   * Metodo que comprueba si la informacion ingresada es valida
   */
  private esInformacionValida(): boolean {

    // se verifica si hay campos de informacion para esta nomenclatura
    if (this.state.camposInformacionValues && this.state.camposInformacionValues.length > 0) {

      // se recorre cada campo
      for (const campoModel of this.state.camposInformacionValues) {

        // se valida dependiendo del tipo de campo
        switch (campoModel.campo.tipoCampo) {

          case this.state.ID_CAMPO_TEXTO: {
            this.esCampoTextoOK(campoModel);
            break;
          }
          case this.state.ID_LISTA_DESPLEGABLE: {
            this.esRequeridoOK(campoModel);
            break;
          }
          case this.state.ID_CAMPO_FECHA: {
            this.esCampoFechaOK(campoModel);
            break;
          }
        }
      }

      // se verifica el resultado a retornar
      for (const value of this.state.camposInformacionValues) {
        if (!value.isValido) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Metodo que permite validar si el valor para el campo de texto es valido
   *
   * @param campoModel, campo de texto a validar si su valor es valido
   */
  private esCampoTextoOK(campoModel: CampoModel): void {

    // se valida la obligatorieda del campo
    this.esRequeridoOK(campoModel);

    // se valida si el campo es solo numeros
    if (campoModel.isSoloNumeros && campoModel.valor) {

      // se verifica el valor ingresado para este campo
      campoModel.isValido = this.regex.isValorNumerico(campoModel.valor);

      // se muestra el mensaje en pantalla
      if (!campoModel.isValido) {
        this.messageService.add(MsjUtil.getToastErrorMedium(this.regex.getMsjSoloNumeros(campoModel.campo.nombre)));
      }
    }
  }

  /**
   * Metodo que permite validar si el campo es requerido y su valor
   *
   * @param campoModel, campo a validar si su valor es obligatorio
   */
  private esRequeridoOK(campoModel: CampoModel): void {
    campoModel.isValido = true;

    // se limpian los espacios solamente para campo de texto
    if (this.state.ID_CAMPO_TEXTO === campoModel.campo.tipoCampo) {
      campoModel.valor = (campoModel.valor) ? campoModel.valor.trim() : null;
    }

    // se valida si este campo es requerido
    if (campoModel.isRequerido) {

      // se valida si el valor fue ingresado por el usuario
      if (!campoModel.valor) {
        campoModel.isValido = false;
      }
    }
  }

  /**
   * Metodo que permite validar si el valor para la fecha es valido
   *
   * @param campoModel, fecha a validar si su valor es valido
   */
  private esCampoFechaOK(campoModel: CampoModel): void {

    // se valida la obligatorieda del campo
    this.esRequeridoOK(campoModel);

    // para la demas validaciones debe existir el valor
    if (campoModel.valor) {

      // debe existir alguna validacion asignada
      if (campoModel.isFechaMayorActual ||
        campoModel.isFechaMenorActual ||
        campoModel.isFechaMayorIgualActual ||
        campoModel.isFechaMenorIgualActual) {

        // se hace la comparacion de las fechas
        const resultado = FechaUtil.compareDate(new Date(campoModel.valor), new Date(this.state.datosIniciales.fechaActual));

        // constantes que indica cual fue su resultado
        const iguales = resultado === 0;
        const esMayor = resultado === 1;
        const esMenor = resultado === -1;

        // validacion cuando la fecha debe ser mayor a la fecha actual
        if (campoModel.isFechaMayorActual) {
          if (iguales || esMenor) {
            campoModel.isValido = false;
            this.messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MAYOR_ACTUAL));
          }
        } else if (campoModel.isFechaMenorActual) {
          // validacion cuando la fecha debe ser menor a la fecha actual
          if (iguales || esMayor) {
            campoModel.isValido = false;
            this.messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MENOR_ACTUAL));
          }

        } else if (campoModel.isFechaMayorIgualActual) {
          // validacion cuando la fecha debe ser mayor o igual que la fecha actual
          if (esMenor) {
            campoModel.isValido = false;
            this.messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MAYOR_IGUAL_ACTUAL));
          }

        } else if (campoModel.isFechaMenorIgualActual) {
          // validacion cuando la fecha debe ser menor o igual que la fecha actual
          if (esMayor) {
            campoModel.isValido = false;
            this.messageService.add(MsjUtil.getToastErrorLng(campoModel.campo.nombre + MsjFrontConstant.FECHA_MENOR_IGUAL_ACTUAL));
          }
        }
      }
    }
  }
}
