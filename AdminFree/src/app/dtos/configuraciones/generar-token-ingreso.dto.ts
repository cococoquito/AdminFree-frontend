/**
 * DTO que se utiliza para la creacion de nuevos TOKENs para
 * el ingreso en el sistema tanto para usuarios o clientes
 *
 * @author Carlos Andres Diaz
 */
export class GenerarTokenIngresoDTO {

  /** Es el identificador del cliente para generar el nuevo TOKEN de ingreso */
  public idCliente: number;

  /** Es el identificador del usuario para generar el nuevo TOKEN de ingreso */
  public idUsuario: number;

  /** Es el TOKEN generado para el cliente o el usuario */
  public token: string;
}
