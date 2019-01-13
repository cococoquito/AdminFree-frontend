/**
 *
 * DTO que contiene los atributos para las restricciones de los campos de
 * ingreso para solicitar consecutivos
 *
 * @author Carlos Andres Diaz
 *
 */
export class RestriccionDTO {

  /** Es el identificador de la restriccion */
  public id: number;

  /** Descripcion de la restriccion */
  public descripcion: string;

  /** Contiene los IDS por la cual esta restriccion no es compatible */
  public compatible: string;

  /** indica si la restriccion aplica para algun campo */
  public aplica: boolean;
}
