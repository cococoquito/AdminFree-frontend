import { TransferenciaDTO } from './transferencia.dto';

/**
 * DTO que contiene los atributos de un consecutivo
 *
 * @author Carlos Andres Diaz
 */
export class ConsecutivoDTO {

  /** Identificador del consecutivo */
  public idConsecutivo: number;

  /** Nro del consecutivo */
  public consecutivo: string;

  /** Identificador de la nomenclatura */
  public idNomenclatura: number;

  /** Nombre de la nomenclatura */
  public nomenclatura: string;

  /** Es la descripcion de la nomenclatura */
  public nomenclaturaDesc: string;

  /** nombre del usuario quien solicito el consecutivo */
  public usuario: string;

  /** Es el cargo del usuario */
  public usuarioCargo: string;

  /** Fecha en la que solicitaron el consecutivo */
  public fechaSolicitud: string;

  /** Fecha en la que anularon el consecutivo (si aplica) */
  public fechaAnulacion: string;

  /** Estado en la que se encuentra el consecutivo */
  public idEstado: number;

  /** Nombre del Estado en la que se encuentra el consecutivo */
  public estado: string;

  /** Lista de transferencias que se han realizado para este consecutivo */
  public transferencias: Array<TransferenciaDTO>;
}
