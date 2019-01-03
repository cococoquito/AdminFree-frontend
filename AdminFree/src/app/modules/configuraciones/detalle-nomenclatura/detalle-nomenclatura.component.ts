import { Component, Input } from '@angular/core';
import { AdminCampoService } from './../../../services/admin-campo.service';
import { NomenclaturaCampoDTO } from './../../../dtos/configuraciones/nomenclatura-campo.dto';
import { NomenclaturaEdicionDTO } from '../../../dtos/configuraciones/nomenclatura-edicion.dto';
import { CampoEntradaDTO } from '../../../dtos/configuraciones/campo-entrada.dto';

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

  /** permite visualizar el modal de ver detalle del campo*/
  public isModalVerDetalle: boolean;

  /** Se utiliza para visualizar el detalle de la nomenclatura*/
  @Input() public detalle: NomenclaturaEdicionDTO;

  /** Se utiliza para visualizar el boton Salir del modal detalle del campo*/
  @Input() public showBtnClose: boolean;

  /** Se utiliza para ver el detalle de un campo de entrada*/
  public campoVerDetalle: CampoEntradaDTO;

  /**
   * @param service , se utiliza para consultar el detalle
   * del campo asociado a la nomenclatura
   */
  constructor(private service: AdminCampoService) {}

  /**
   * Metodo que soporta el evento click del boton ver detalle del campo
   */
  public showModalVerDetalle(campo: NomenclaturaCampoDTO): void {
    if (!this.isModalVerDetalle) {
      this.service.getDetalleCampoEntrada(campo.idCampo).subscribe(
        data => {
          this.campoVerDetalle = data;
          this.isModalVerDetalle = true;
        },
        error => {}
      );
    }
  }

  /**
   * Metodo que es invocado cuando se cierra el modal de ver detalle del campo
   */
  public closeModalVerDetalle(): void {
    this.isModalVerDetalle = false;
    this.campoVerDetalle = null;
  }
}
