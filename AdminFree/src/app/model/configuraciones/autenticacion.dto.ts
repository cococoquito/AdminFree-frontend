/**
 * DTO que contiene los atributos para la autenticacion del sistema
 *
 * @author Carlos Andres Diaz
 */
export class AutenticacionDTO {

  /** Es el usuario de la autenticacion para administrar clientes */
  public usuario: string;

  /** Es el clave de la autenticacion para administrar clientes */
  public clave: string;

  /** Es el token generado desde el servidor */
  public token: string;
}
