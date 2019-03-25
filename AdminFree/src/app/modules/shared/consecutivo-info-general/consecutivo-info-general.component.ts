import { Component, Input } from '@angular/core';
import { VentanaModalModel } from '../../../model/ventana-modal.model';
import { ConsecutivoDTO } from '../../../dtos/correspondencia/consecutivo.dto';
import { EstadoConstant } from '../../../constants/estado.constant';

/**
 * Componente para visualizar la informacion general del consecutivo
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-consecutivo-info-general',
  templateUrl: './consecutivo-info-general.component.html',
  styleUrls: ['./consecutivo-info-general.component.css']
})
export class ConsecutivoInfoGeneralComponent {

  /** Contiene la informacion general del consecutivo */
  @Input() public consecutivo: ConsecutivoDTO;

  /** Modelo modal para ver historial de transferencias del consecutivo */
  public modalTransferencias: VentanaModalModel;

  /** Constantes que representan los identificadores de ACTIVO - ANULADO */
  public ID_ACTIVO = EstadoConstant.ID_ACTIVO;
  public ID_ANULADO = EstadoConstant.ID_ANULADO;

  /**
   * Metodo que soporta el evento click del boton ver historial transferencia
   */
  public verHistorialTransferencia(): void {
    if (!this.modalTransferencias) {
      this.modalTransferencias = new VentanaModalModel();
    }
    this.modalTransferencias.showModal(this.consecutivo.transferencias);
  }
}
