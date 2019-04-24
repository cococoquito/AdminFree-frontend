import { Documental } from './documental';

/**
 * DTO que contiene los atributos de la sub-serie documental
 *
 * @author Carlos Andres Diaz
 */
export class SubSerieDocumentalDTO extends Documental {

  /** Identificador de la sub-serie documental */
  public idSubSerie: number;

  /** Identificador serie documental que es propietaria de esta subserie */
  public idSerie: number;
}
