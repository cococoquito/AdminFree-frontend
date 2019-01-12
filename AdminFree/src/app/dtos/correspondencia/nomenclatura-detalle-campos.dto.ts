/**
 * Contiene el detalle de los campos relacionados a una nomenclatura
 *
 * @author Carlos Andres Diaz
 *
 */
export class NomenclaturaDetalleCamposDTO {

  /** Identificador del campo */
  public id: number;

  /** Es el nombre del campo */
  public nombre: string;

  /** Es la descripcion que identifica el campo */
  public descripcion: string;

  /** Nombre del tipo de campo */
  public tipoCampo: string;
}
