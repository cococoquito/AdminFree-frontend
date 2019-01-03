import { Component, Input } from '@angular/core';
import { NomenclaturaEdicionDTO } from '../../../dtos/configuraciones/nomenclatura-edicion.dto';

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

  /** Se utiliza para visualizar el detalle de la nomenclatura*/
  @Input() public detalle: NomenclaturaEdicionDTO;
}
