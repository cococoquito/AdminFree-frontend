/**
 * DTO que contiene los atributos de un tipo documental para serie o subserie
 *
 * @author Carlos Andres Diaz
 */
export class TipoDocumentalDTO {

  /** Identificador del tipo documental */
  public id: number;

  /** Nombre del tipo documental */
  public nombre: string;

  /** Identifica que tipo de accion se va realizar sobre el tipo documental */
  public tipoEvento: string;
}
