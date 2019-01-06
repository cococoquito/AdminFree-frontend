import { NomenclaturaCampoDTO } from './nomenclatura-campo.dto';

/**
 * DTO que contiene los atributos de la nomenclatura
 *
 * @author Carlos Andres Diaz
 */
export class NomenclaturaDTO {

  /** Identificador de la nomenclatura */
  public id: number;

  /** Identificador del cliente */
  public idCliente: number;

  /** Nombre abreviado de la nomenclatura */
  public nomenclatura: string;

  /** Descripcion de la nomenclatura */
  public descripcion: string;

  /** Nro donde inicia el consecutivo a generar */
  public consecutivoInicial: number;

  /** Indica si la nomenclatura esta asociada a un consecutivo */
  public tieneConsecutivos: boolean;

  /** Son los campos asociados de la nomenclatura */
  public campos: Array<NomenclaturaCampoDTO>;
}
