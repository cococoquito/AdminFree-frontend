/**
 * DTO para el proceso de negocio de cambio de clave de ingreso
 *
 * @author Carlos Andres Diaz
 *
 */
export class CambioClaveDTO {

  /** Identificador del user a modificar la clave de ingreso **/
  public idUsuario: number;

  /** Es la clave actual que tiene el usuario */
  public claveActual: string;

  /** Representa la nueva clave de ingreso */
  public claveNueva: string;

  /** Es la nueva clave de ingreso confirmada */
  public claveVerificacion: string;
}
