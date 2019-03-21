import { DocumentoDTO } from './documento.dto';
import { CampoEntradaValueDTO } from './campo-entrada-value.dto';
import { ConsecutivoDTO } from './consecutivo.dto';
import { TransferenciaDTO } from './transferencia.dto';
/**
 * Contiene el detalle de un consecutivo, consecutivo, valores, documentos
 *
 * @author Carlos Andres Diaz
 */
export class ConsecutivoDetalleDTO {

  /** identificador del cliente, se utiliza para buscar el detalle del consecutivo */
  public idCliente: number;

  /** identificador del consecutivo, se utiliza para buscar el detalle del consecutivo */
  public idConsecutivo: number;

  /** Contiene los valores generales del consecutivo */
  public consecutivo: ConsecutivoDTO;

  /** Contiene la informacion del consecutivo */
  public valores: Array<CampoEntradaValueDTO>;

  /** Documentos asociados al consecutivos */
  public documentos: Array<DocumentoDTO>;

  /** Lista de transferencias que se han realizado para este consecutivo */
  public transferencias: Array<TransferenciaDTO>;
}
