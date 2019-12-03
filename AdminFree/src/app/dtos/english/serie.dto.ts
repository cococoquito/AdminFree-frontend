import { SeasonDTO } from "./season.dto";

/**
 * DTO para mappear las series
 *
 * @author Carlos Andres Diaz
 */
export class SerieDTO {

  /** identificador de la serie */
  public id: number;

  /** Es el nombre de la serie */
  public name: string;

  /** Es la URL de esta serie */
  public url: string;

  /** es la imagen a mostrar en pantalla */
  public img: any;

  /** son las temporadas de esta serie */
  public seasons: Array<SeasonDTO>;
}
