/**
 * DTO para transportar las nomenclaturas para la pagina de bienvenida
 *
 * @author Carlos Andres Diaz
 */
export class WelcomeNomenclaturaDTO {

  /** Identificador de la nomenclatura */
  public idNomenclatura: number;

  /** Es el texto nomenclatura */
  public nomenclatura: string;

  /** Descripcion de la nomenclatura */
  public descripcion: string;

  /** Cantidad de consecutivos que han solicitado a esta nomenclatura */
  public cantidadConsecutivos: number;
}
