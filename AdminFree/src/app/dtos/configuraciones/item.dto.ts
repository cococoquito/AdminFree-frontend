/**
 * DTO que representa un ITEM para la lista desplegable
 *
 * @author Carlos Andres Diaz
 *
 */
export class ItemDTO {

  /** Identificador del Item para los campos lista desplegable */
  public id: number;

  /** Identificador del campo asociado para este item */
  public idCampo: number;

  /** Valor del Item */
  public valor: string;

  /** indica si el item se debe borrar */
  public borrar: boolean;

  /** indica si el item fue modificado */
  public modificado: boolean;
}
