import { Component, Input } from '@angular/core';
import { CampoEntradaDetalleDTO } from '../../../dtos/correspondencia/campo-entrada-detalle.dto';

/**
 * Componente para la administracion de los campos de informacion
 * para las solicitudes de consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
@Component({
  selector: 'admin-campos-informacion',
  templateUrl: './campos-informacion.component.html',
  styleUrls: ['./campos-informacion.component.css']
})
export class CamposInformacionComponent {

  /** Contiene el detalle de los campos de entrada informacion*/
  @Input() public campos: Array<CampoEntradaDetalleDTO>;

  constructor() { }

}
