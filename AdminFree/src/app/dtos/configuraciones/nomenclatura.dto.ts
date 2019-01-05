/**
 *
 * DTO que contiene los atributos de la nomenclatura
 *
 * @author Carlos Andres Diaz
 */
export class NomenclaturaDTO {

  /** Identificador de la nomenclatura */
  public id: number;

  /** Nombre abreviado de la nomenclatura */
  public nomenclatura: string;

  /** Descripcion de la nomenclatura */
  public descripcion: string;

  /** Identificador del cliente */
  public idCliente: number;

  /** Nro donde inicia el consecutivo a generar */
  public consecutivoInicial: number;

  /** Son los campos asociados a la nomenclatura se utiliza para la creacion */
  public idsCampos: Array<number>;
}
