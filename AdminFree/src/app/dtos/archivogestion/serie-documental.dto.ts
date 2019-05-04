import { Documental } from './documental';
import { SubSerieDocumentalDTO } from './sub-serie-documental.dto';
import { FiltroSerieDocumentalDTO } from './filtro-serie-documental.dto';

/**
 * DTO que contiene los atributos de la serie documental
 *
 * @author Carlos Andres Diaz
 */
export class SerieDocumentalDTO extends Documental {

  /** Identificador de la serie documental */
  public idSerie: number;

  /** Lista de subseries que contiene esta serie documental */
  public subSeries: Array<SubSerieDocumentalDTO>;

  /** Se utiliza al momento de eliminar una serie documental */
  public filtro: FiltroSerieDocumentalDTO;
}
