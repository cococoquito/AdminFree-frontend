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

  /** Indica el orden en la que se va mostrar este campo en los modulos */
  public orden: number;

  /** Identifica si este campo para la nomenclatura tiene consecutivos asociados*/
  public tieneConsecutivo: boolean;
}
