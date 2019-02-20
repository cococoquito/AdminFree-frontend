import { Component } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommonComponent } from '../../../../util/common.component';
import { CorrespondenciaService } from '../../../../services/correspondencia.service';
import { SolicitarConsecutivoState } from '../../../../states/correspondencia/solicitar-consecutivo.state';
import { SpinnerState } from '../../../../states/spinner.state';
import { DocumentoDTO } from '../../../../dtos/correspondencia/documento.dto';
import { MsjUtil } from '../../../../util/messages.util';
import { MsjFrontConstant } from '../../../../constants/messages-frontend.constant';
import { LabelsConstant } from '../../../../constants/labels.constant';

/**
 * Componente para el ultimo paso del proceso de negocio de solicitar
 * consecutivos, donde se muestra el consecutivo generado y brinda la
 * opcion de subir los documentos asociados al nuevo consecutivo
 *
 * application/pdf = pdf
 * application/msword =  Microsoft Word
 * application/vnd.ms-excel = Microsoft Excel
 * application/vnd.oasis.opendocument.text = Documento de texto OpenDocument
 * https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Lista_completa_de_tipos_MIME
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-consecutivo-generado',
  templateUrl: './consecutivo-generado.component.html',
  styleUrls: ['./consecutivo-generado.component.css']
})
export class ConsecutivoGeneradoComponent extends CommonComponent {

  /** Son los documentos cargados para este consecutivo*/
  public documentos: Array<DocumentoDTO>;

  /**
   * @param state, estado para administrar los datos para las
   * solicitudes de consecutivos de correspondencia
   *
   * @param correspondenciaService, se utiliza para llamar
   * los procesos de negocio de cargue de documentos
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   *
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param confirmationService, Se utiliza para mostrar la ventana
   * de confirmacion para la eliminacion de algun documento
   */
  constructor(
    public state: SolicitarConsecutivoState,
    private correspondenciaService: CorrespondenciaService,
    private spinnerState: SpinnerState,
    protected messageService: MessageService,
    private confirmationService: ConfirmationService) {
    super();
  }

  /**
   * Metodo que permite soportar el evento del boton
   * 'Regresar para solicitar otro consecutivo'
   */
  public irPrimerPaso(): void {

    // se limpia mensajes de errores
    this.messageService.clear();

    // se redirecciona al primer paso
    this.state.stepsModel.irPrimerStep();

    // para este proceso es valido mostrar el spinner
    this.spinnerState.displaySpinner();

    // se debe hacer llamado asincrono para evitar errores de este componente
    setTimeout(() => {

      // se reinicia las variables para solicitar otro consecutivo
      this.state.reiniciar();

      // En este punto el sistema ya se encuentra en el paso uno
      this.spinnerState.hideSpinner();
    }, 200);
  }

  /**
   * Metodo que soporta el evento del boton 'Cargar Documento'
   *
   * @param event, contiene el documento seleccionado para el cargue
   */
  public cargarDocumento(event): void {

    // se limpia mensajes de errores
    this.messageService.clear();

    // se obtiene los archivo que contiene el evento
    const files = event.files;

    // el archivo es requerido para el cargue
    if (files) {

      // se configura los parametros para el cargue
      const parametros = new FormData();
      parametros.append('documento', files[0]);
      parametros.append('idCliente', this.state.clienteCurrent.id + '');
      parametros.append('idConsecutivo', this.state.responseSolicitud.idConsecutivo + '');

      // se procede hacer la invocacion del cargue de documento
      this.correspondenciaService.cargarDocumento(parametros).subscribe(
        data => {
          this.documentos = data;
          this.messageService.add(MsjUtil.getToastSuccessLng(MsjFrontConstant.DOCUMENTO_CARGADO));
        },
        error => {
          let msj = this.showMensajeError(error);
          msj = msj.replace('?1', this.state.responseSolicitud.consecutivo);
          msj = msj.replace('?2', files[0].name);
          this.messageService.add(this.showErrorCargue(msj));
        }
      );
    }
  }

  /**
   * Metodo que soporta el evento de eliminar un documento
   *
   * @param documento, documento seleccionado para eliminarlo
   */
  public eliminarDocumento(documento: DocumentoDTO): void {

    // se limpia mensajes de errores
    this.messageService.clear();

    // se visualiza la ventana de confirmacion
    this.confirmationService.confirm({
      message: MsjFrontConstant.DOCUMENTO_ELIMINAR_CONFIRMACION.replace('?1', documento.nombreDocumento),
      header: MsjFrontConstant.CONFIRMACION,
      accept: () => {

        // se procede hacer la invocacion para eliminar el documento
        documento.idCliente = this.state.clienteCurrent.id + '';
        this.correspondenciaService.eliminarDocumento(documento).subscribe(
          data => {
            this.documentos = data;
            this.messageService.add(MsjUtil.getToastSuccess(MsjFrontConstant.DOCUMENTO_ELIMINADO));
          },
          error => {
            this.messageService.add(this.showErrorCargue(this.showMensajeError(error)));
          }
        );
      }
    });
  }

  /**
   * Metodo que permite construir el mensaje
   */
  private showErrorCargue(detail: string): Message {
    return {
      key: 'docs',
      severity: LabelsConstant.ERROR,
      summary: MsjFrontConstant.ERROR,
      detail: detail
    };
  }
}
