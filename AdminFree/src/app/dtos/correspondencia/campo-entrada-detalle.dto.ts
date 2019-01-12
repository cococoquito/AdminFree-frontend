import { ItemDTO } from './../configuraciones/item.dto';

/**
 * Contiene el detalle de los campos de entrada de informacion
 *
 * @author Carlos Andres Diaz
 *
 */
export class CampoEntradaDetalleDTO {

  /** Identificador del campo */
  public id: string;

  /** nombre del campo */
  public nombre: string;

  /** descripcion del campo */
  public descripcion: string;

  /** identifica el tipo de campo */
  public tipoCampo: number;

  /** son las restricciones que tiene este campo */
  public restricciones: Array<string>;

  /** Son los items para este campo, solo aplica para lista desplegable */
  public items: Array<ItemDTO>;
}
