/**
 * DTO que contiene los atributos para la autenticacion del sistema
 *
 * @author Carlos Andres Diaz
 */
export class AutenticacionDTO {

  /** Es el usuario para la autenticacion del sistema */
  public usuario: string;

  /** Es la clave para la autenticacion del sistema */
  public clave: string;

  /** Es el token generado desde el servidor */
  public token: string;

  /** Indica si el usuario es un administrador */
  public administrador: boolean;
}
