/**
 * Clase que mapea los atributos del response al momento de
 * consultar los registros con su total a mostrar
 *
 * @author Carlos Andres Diaz
 */
export class PaginadorResponseDTO {

  /** son los registros consultados */
  public registros: any;

  /** cantidad total de los registros*/
  public cantidadTotal: number;
}
