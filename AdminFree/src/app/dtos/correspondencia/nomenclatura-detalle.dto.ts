import { NomenclaturaDetalleCamposDTO } from './nomenclatura-detalle-campos.dto';

/**
 * Contiene el detalle de la nomenclatura para el modulo de correspondencia
 *
 * @author Carlos Andres Diaz
 *
 */
export class NomenclaturaDetalleDTO {

  /** Identificador de la nomenclatura */
  public id: number;

  /** nombre abreviada de la nomenclatura */
  public nomenclatura: string;

  /** Descripcion de la nomenclatura */
  public descripcion: string;

  /** Consecutivo inicial asociada a la nomenclatura */
  public consecutivoInicial: number;

  /** Cantidad de consecutivos solicitados para la nomenclatura */
  public cantidadConsecutivos: number;

  /** Lista de campos de entrada informacion asociada a la nomenclatura */
  public campos: Array<NomenclaturaDetalleCamposDTO>;
}
