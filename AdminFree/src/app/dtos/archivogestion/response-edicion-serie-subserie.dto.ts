import { Documental } from './documental';
import { TipoDocumentalDTO } from './tipo-documental.dto';

/**
 * DTO que contiene el response de la edicion de la serie/subserie documental
 *
 * @author Carlos Andres Diaz
 */
export class ResponseEdicionSerieSubserieDTO {

  /** contiene los datos que fueron actualizados en el sistema **/
  public datosUpdate: Documental;

  /** son los nuevos tipos documentales registrados en el sistema **/
  public tiposDocumentales: Array<TipoDocumentalDTO>;
}
