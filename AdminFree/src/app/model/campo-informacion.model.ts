import { CampoEntradaDetalleDTO } from './../dtos/correspondencia/campo-entrada-detalle.dto';
import { CampoModel } from './campo-model';

/**
 * Es el modelo del componente de campos de informacion
 *
 * @author Carlos Andres Diaz
 *
 */
export class CampoInformacionModel {

  /** Son los campos asociados a la nomenclatura seleccionada */
  public campos: Array<CampoEntradaDetalleDTO>;

  /** Backup de los campos para el componente por si el usuario retrocede en los pasos*/
  public camposVisualizar: Array<CampoModel>;

  /** identifica que nomenclatura fue seleccionada para la solicitud del consecutivo */
  public idNomeclatura: number;

  /** Es la fecha actual traida desde el servidor */
  public fechaActual: Date;
}
