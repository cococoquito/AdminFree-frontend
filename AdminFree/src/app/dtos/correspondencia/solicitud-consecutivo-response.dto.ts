/**
 * DTO que es utilizado para retornar la respuesta al momento de solicitar los
 * consecutivos de correspondencia
 *
 * @author Carlos Andres Diaz
 */
export class SolicitudConsecutivoResponseDTO {

  /** Identificador del consecutivo generado al momento de realizar la solicitud */
  public idConsecutivo: number;

  /** Nro consecutivo generado para el proceso */
  public consecutivo: string;
}
