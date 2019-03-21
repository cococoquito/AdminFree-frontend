/**
 * DTO que contiene los atributos de una transferencia
 * de un consecutivo para otro usuario
 *
 * @author Carlos Andres Diaz
 */
export class TransferenciaDTO {

  /** Es el consecutivo en la cual se hizo la transferencia */
  public consecutivo: string;

  /** Nomenclatura asociada al consecutivo */
  public nomenclatura: string;

  /** Es el nombre del usuario quien era o es duenio del consecutivo */
  public usuario: string;

  /** Es la fecha que se hizo la transferencia */
  public fechaTransferido: string;
}
