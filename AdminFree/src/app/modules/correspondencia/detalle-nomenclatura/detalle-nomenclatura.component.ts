import { Component, Input } from '@angular/core';
import { NomenclaturaDetalleDTO } from './../../../dtos/correspondencia/nomenclatura-detalle.dto';

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
  @Input() public detalle: NomenclaturaDetalleDTO;
}
