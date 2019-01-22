import { CampoEntradaDetalleDTO } from './../dtos/correspondencia/campo-entrada-detalle.dto';

/**
 * Es el modelo del componente de campos de informacion
 *
 * @author Carlos Andres Diaz
 *
 */
export class CampoInformacionModel {

  /** Son los campos asociados a la nomenclatura seleccionada */
  public campos: Array<CampoEntradaDetalleDTO>;

  /** Es la fecha actual traida desde el servidor */
  public fechaActual: Date;
}
