import { ChapterDTO } from "./chapter.dto";

/**
 * DTO que se utiliza para mappear los datos de las temporadas de una serie
 *
 * @author Carlos Andres Diaz
 *
 */
export class SeasonDTO {

  /** identificador de la temporada */
  public id: number;

  /** Se utiliza para visualizarlo en pantalla, aunque no se guarda en BD */
  public name: string;

  /** Son los capitulos de esta temporada */
  public chapters: Array<ChapterDTO>;
}
