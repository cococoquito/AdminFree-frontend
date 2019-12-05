import { SentenceDTO } from "./sentence.dto";

/**
 * DTO que se utiliza para mappear los datos de los capitulos
 *
 * @author Carlos Andres Diaz
 *
 */
export class ChapterDTO {

  /** identificador del capitulo */
  public id: number;

	/** identificador de la temporada */
	public idSeason: number;

	/** identificador de la serie */
	public idSerie: number;

  /** Es el nombre del capitulo */
  public name: string;

  /** Es la URL de este capitulo */
  public url: string;

  /** Son las sentencias que tiene este capitulo */
  public sentences: Array<SentenceDTO>;
}
