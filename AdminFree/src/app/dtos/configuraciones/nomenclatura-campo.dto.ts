/**
 * DTO que contiene los atributos del campo que le pertenece a
 * una nomenclatura especifica
 *
 * @author Carlos Andres Diaz
 */
export class NomenclaturaCampoDTO {

  /** Identificador del registro */
  public id: number;

  /** identificador del campo */
  public idCampo: number;

  /** Es el nombre del campo */
  public nombreCampo: string;

  /** Es el tipo de campo */
  public tipoCampo: string;

  /** indica si el item se debe borrar */
  public borrar: boolean;
}
