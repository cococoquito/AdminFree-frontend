import { Component, Input } from '@angular/core';
import { CampoEntradaDetalleDTO } from '../../../dtos/correspondencia/campo-entrada-detalle.dto';
import { TipoCamposConstant } from '../../../constants/tipo-campos.constant';

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

  /** identificadores de cada tipo de campo*/
  public ID_CAMPO_TEXTO = TipoCamposConstant.ID_CAMPO_TEXTO;
  public ID_LISTA_DESPLEGABLE = TipoCamposConstant.ID_LISTA_DESPLEGABLE;
  public ID_CASILLA_VERIFICACION = TipoCamposConstant.ID_CASILLA_VERIFICACION;
  public ID_CAMPO_FECHA = TipoCamposConstant.ID_CAMPO_FECHA;

  constructor() { }

}
