/**
 * DTO que contiene los atributos de una transferencia
 * de un consecutivo para otro usuario
 *
 * @author Carlos Andres Diaz
 */
export class TransferenciaDTO {

  /** Es el nombre del usuario quien era o es duenio del consecutivo */
  public usuario: string;

  /** Es el cargo que tiene el usuario */
  public usuarioCargo: string;

  /** Es la fecha que se hizo la transferencia */
  public fechaTransferido: string;
}
