import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from '../../../../services/correspondencia.service';
import { SolicitarConsecutivoState } from '../../../../states/correspondencia/solicitar-consecutivo.state';
import { SpinnerState } from '../../../../states/spinner.state';
import { CommonComponent } from '../../../../util/common.component';

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

  /**
   * @param state, estado para administrar los datos para las
   * solicitudes de consecutivos de correspondencia
   *
   * @param correspondenciaService, contiene los servicios
   * del modulo de correspondencia
   *
   * @param spinnerState, se utiliza para simular el spinner cuando
   * cambian entre los steps
   *
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   */
  constructor(
    public state: SolicitarConsecutivoState,
    private correspondenciaService: CorrespondenciaService,
    private spinnerState: SpinnerState,
    protected messageService: MessageService) {
    super();
  }

  /**
   * Metodo que permite soportar el evento del boton
   * 'Regresar al paso 1 para solicitar otro consecutivo'
   */
  public irPrimerPaso(): void {

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
}
