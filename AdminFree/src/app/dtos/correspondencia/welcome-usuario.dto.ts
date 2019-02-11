/**
 * DTO para transportar los usuarios para la pagina de bienvenida
 *
 * @author Carlos Andres Diaz
 */
export class WelcomeUsuarioDTO {

  /** identificador del usuario */
  public idUsuario: number;

  /** Nombre completo del usuario */
  public nombreCompleto: string;

  /** Cargo que tiene el usuario */
  public cargo: string;

  /** Estado en la que se encuentra el usuario */
  public estado: string;

  /** Cantidad de consecutivos que ha solicitado este usuario */
  public cantidadConsecutivos: number;
}
