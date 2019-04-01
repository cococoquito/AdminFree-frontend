import { ConsecutivoDTO } from './consecutivo.dto';
import { DocumentoDTO } from './documento.dto';
import { ConsecutivoEdicionValueDTO } from './consecutivo-edicion-value.dto';
import { CampoEntradaValueDTO } from './campo-entrada-value.dto';
import { MessageResponseDTO } from '../transversal/message-response.dto';

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

  /** Se utiliza para la edicion de los valores del consecutivo */
  public idNomenclatura: number;

  /** Contiene los valores generales del consecutivo */
  public consecutivo: ConsecutivoDTO;

  /** Son los valores a editar de este consecutivo */
  public values: Array<ConsecutivoEdicionValueDTO>;

  /** Se utiliza al editar values del consecutivo, Valores a validar de acuerdo a sus restricciones */
  public valoresValidar: Array<CampoEntradaValueDTO>;

  /** Documentos asociados al consecutivos */
  public documentos: Array<DocumentoDTO>;

  /** Lista de errores encontrados en el proceso de edicion */
  public errores: Array<MessageResponseDTO>;
}
