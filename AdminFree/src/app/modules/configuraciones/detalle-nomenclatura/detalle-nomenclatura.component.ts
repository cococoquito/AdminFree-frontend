import { Component, Input } from '@angular/core';
import { AdminCampoService } from './../../../services/admin-campo.service';
import { NomenclaturaCampoDTO } from './../../../dtos/configuraciones/nomenclatura-campo.dto';
import { NomenclaturaEdicionDTO } from '../../../dtos/configuraciones/nomenclatura-edicion.dto';
import { CampoEntradaDTO } from '../../../dtos/configuraciones/campo-entrada.dto';
import { NomenclaturaDTO } from '../../../dtos/configuraciones/nomenclatura.dto';

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

  /** permite visualizar el modal de ver detalle del campo*/
  public isModalVerDetalle: boolean;

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
