import { Component, Input } from '@angular/core';
import { ConfiguracionesService } from './../../../services/configuraciones.service';
import { NomenclaturaCampoDTO } from './../../../dtos/configuraciones/nomenclatura-campo.dto';
import { NomenclaturaEdicionDTO } from '../../../dtos/configuraciones/nomenclatura-edicion.dto';
import { NomenclaturaDTO } from '../../../dtos/configuraciones/nomenclatura.dto';
import { VentanaModalModel } from './../../../model/ventana-modal.model';
import { ModulesTokenConstant } from '../../../constants/modules-token.constant';

/**
 * Componente para visualizar el detalle de la NOMENCLATURA
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-detalle-nomenclatura',
  templateUrl: './detalle-nomenclatura.component.html'
})
export class DetalleNomenclaturaComponent {

  /** Contiene los datos del detalle de la nomenclatura a visualizar*/
  @Input() public detalle: NomenclaturaDTO;

  /** Se utiliza mostrar que pasos fueron modificados, aplica solo para edicion*/
  @Input() public modificaciones: NomenclaturaEdicionDTO;

  /** bandera que identifica si este ver detalle se va mostrar como modal*/
  @Input() public isModal: boolean;

  /** Es el token del modulo quien invoca este detalle*/
  @Input() public modulo: string;

  /** se utiliza para visualizar el detalle del campo asociado a la nomenclatura*/
  public verDetalleCampo: VentanaModalModel;

  /** Constante que representa los token de los modulos*/
  public TK_CORRESPONDENCIA = ModulesTokenConstant.TK_CORRESPONDENCIA;
  public TK_CONFIGURACIONES = ModulesTokenConstant.TK_CONFIGURACIONES;

  /**
   * @param service , se utiliza para consultar el detalle
   * del campo asociado a la nomenclatura
   */
  constructor(private service: ConfiguracionesService) {}

  /**
   * Metodo que soporta el evento click del boton ver detalle del campo
   */
  public showModalVerDetalle(campo: NomenclaturaCampoDTO): void {
    if (!this.verDetalleCampo || !this.verDetalleCampo.isShowModal) {
      this.service.getDetalleCampoEntrada(campo.idCampo).subscribe(
        data => {
          if (!this.verDetalleCampo) {
            this.verDetalleCampo = new VentanaModalModel();
          }
          this.verDetalleCampo.showModal(data);
        },
        error => {}
      );
    }
  }
}
