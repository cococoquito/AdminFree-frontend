/**
 * DTO que se utiliza para mappear los datos de las sentencias
 *
 * @author Carlos Andres Diaz
 *
 */
export class SentenceDTO {

  /** identificador de la sentencia */
  public id: number;

  /** Es la sentencia en español */
  public spanish: string;

  /** Es la sentencia en english */
  public english: string;

  /** Es el audio de la sentencia */
  public audio: any;

  /** Es el nombre del audio de la sentencia */
  public audioName: string;
}
