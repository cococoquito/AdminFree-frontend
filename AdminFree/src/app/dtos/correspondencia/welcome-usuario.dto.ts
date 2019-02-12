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

  /** Es el identificador del estado del usuario */
  public idEstado: number;

  /** Cantidad de consecutivos que ha solicitado este usuario */
  public cantidadConsecutivos: number;

  /***************** Variables utilizadas en Angular *****************/
  /** Es el porcentaje de consecutivos solicitados por este usuario */
  public porcentaje: number;
}
