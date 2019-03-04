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

  /** Nombre de la nomenclatura */
  public nomenclatura: string;

  /** Es la descripcion de la nomenclatura */
  public nomenclaturaDesc: string;

  /** nombre del usuario quien solicito el consecutivo */
  public usuario: string;

  /** Fecha en la que solicitaron el consecutivo */
  public fechaSolicitud: string;

  /** Estado en la que se encuentra el consecutivo */
  public idEstado: number;
}
