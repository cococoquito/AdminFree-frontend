import { ConsecutivoDTO } from './consecutivo.dto';
import { DocumentoDTO } from './documento.dto';
import { ConsecutivoEdicionValueDTO } from './consecutivo-edicion-value.dto';

/**
 * Este DTO se utiliza para encapsular los datos de un consecutivo
 * de correspondencia para su respectiva edicion
 *
 * @author Carlos Andres Diaz
 *
 */
export class ConsecutivoEdicionDTO {

  /** identificador del cliente, se utiliza para buscar el detalle del consecutivo */
  public idCliente: number;

  /** identificador del consecutivo, se utiliza para buscar el detalle del consecutivo */
  public idConsecutivo: number;

  /** Contiene los valores generales del consecutivo */
  public consecutivo: ConsecutivoDTO;

  /** Son los valores a editar de este consecutivo */
  public values: Array<ConsecutivoEdicionValueDTO>;

  /** Documentos asociados al consecutivos */
  public documentos: Array<DocumentoDTO>;
}
