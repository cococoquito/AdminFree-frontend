import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrespondenciaService } from './../../../../services/correspondencia.service';
import { SolicitarConsecutivoState } from '../../../../states/correspondencia/solicitar-consecutivo.state';
import { CommonComponent } from '../../../../util/common.component';
import { SolicitudConsecutivoDTO } from '../../../../dtos/correspondencia/solicitud-consecutivo.dto';
import { CampoEntradaValueDTO } from '../../../../dtos/correspondencia/campo-entrada-value.dto';
import { WelcomeDTO } from '../../../../dtos/seguridad/welcome.dto';
import { LocalStoreUtil } from '../../../../util/local-store.util';
import { MsjUtil } from '../../../../util/messages.util';
import { TipoEventoConstant } from '../../../../constants/tipo-evento.constant';

/**
 * Componente de confirmacion para las solicitudes de
 * los consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-confirmacion',
  templateUrl: './confirmacion.component.html'
})
export class ConfirmacionComponent extends CommonComponent {

  /**
   * @param state, estado para administrar los datos para las
   * solicitudes de los consecutivos de correspondencia
   *
   * @param messageService, Se utiliza para la visualizacion
   * de los mensajes en la pantalla
   *
   * @param correspondenciaService, contiene los servicios
   * del modulo de correspondencia
   */
  constructor(
    public state: SolicitarConsecutivoState,
    protected messageService: MessageService,
    private correspondenciaService: CorrespondenciaService) {
    super();
  }

  /**
   * Metodo que soporta el evento del boton de solicitar
   * consecutivo de correspondencia
   */
  public solicitarConsecutivo(): void {

    // se realiza la invocacion para solicitar un consecutivo
    this.correspondenciaService.solicitarConsecutivo(this.getSolicitudConsecutivo()).subscribe(
      data => {
        this.state.responseSolicitud = data;
        this.state.stepsModel.irUltimoStep();
      },
      error => {
        this.messageService.add(MsjUtil.getMsjError(this.showMensajeError(error)));
      }
    );
  }

  /**
   * Metodo que permite construir la solicitud para ser enviado
   * al servicio http de solicitar consecutivo correspondencia
   */
  private getSolicitudConsecutivo(): SolicitudConsecutivoDTO {

    // es la solicitud a enviar al server
    const solicitud = new SolicitudConsecutivoDTO();

    // identificador del cliente asociado al usuario autenticado
    solicitud.idCliente = this.state.clienteCurrent.id;

    // identificador de la nomenclatura seleccionada
    solicitud.idNomenclatura = this.state.nomenclaturaSeleccionada.id;

    // se configura el id del usuario quien solicita el consecutivo, si este campo
    // es nulo quiere decir que el admin es el que esta solicitando el consecutivo
    const welcome: WelcomeDTO = LocalStoreUtil.welcome(TipoEventoConstant.GET);
    if (welcome && welcome.credenciales && !welcome.credenciales.administrador) {
      solicitud.idUsuario = welcome.usuario.id;
    }

    // se verifica si la nomenclatura seleccionada tiene campos asociados
    const camposInformacionValues = this.state.camposInformacionValues;
    if (camposInformacionValues && camposInformacionValues.length > 0) {

      // se crea los valores a enviar en la solicitud
      solicitud.valores = new Array<CampoEntradaValueDTO>();

      // se recorre cada valor ingresado
      let solicitudValue: CampoEntradaValueDTO;
      for (const campoIngreso of camposInformacionValues) {
        solicitudValue = new CampoEntradaValueDTO();

        // identificador de la tabla NOMENCLATURAS_CAMPOS_ENTRADA.ID_NOME_CAMPO
        solicitudValue.idCampoNomenclatura = campoIngreso.campo.idCampoNomenclatura;

        // el valor puede ser nulo
        if (campoIngreso.valor || campoIngreso.campo.tipoCampo === this.state.ID_CASILLA_VERIFICACION) {

          // valor ingresado para este campo
          solicitudValue.value = campoIngreso.valor;
          switch (campoIngreso.campo.tipoCampo) {

            case this.state.ID_LISTA_DESPLEGABLE: {
              solicitudValue.value = campoIngreso.valor.id;
              break;
            }
            case this.state.ID_CASILLA_VERIFICACION: {
              solicitudValue.value = (campoIngreso.valor) ? 1 : 0;
              break;
            }
            case this.state.ID_CAMPO_FECHA: {
              solicitudValue.value = new Date(campoIngreso.valor).toLocaleDateString();
              break;
            }
          }
        }

        // se agrega el value a la solicitud
        solicitud.valores.push(solicitudValue);
      }
    }
    return solicitud;
  }
}
