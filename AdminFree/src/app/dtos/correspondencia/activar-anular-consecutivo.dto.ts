/**
 * DTO que se utiliza para ACTIVAR o ANULAR un consecutivo de correspondencia
 *
 * @author Carlos Andres Diaz
 */
export class ActivarAnularConsecutivoDTO {

  /** Identificador del cliente que contiene la tabla donde esta el consecutivo */
  public idCliente: number;

  /** Identificador del consecutivo para ACTIVAR o ANULAR */
  public idConsecutivo: number;

  /** Es el nuevo estado (ACTIVO-ANULADO) para el consecutivo */
  public idEstado: number;
}
