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

  /** Es la secuencia de consecutivos solicitados */
  public secuencia: number;

  /** Es la cantidad de consecutivos solicitados para esta nomenclatura */
  public cantConsecutivos: number;

  /** Son los campos asociados de la nomenclatura */
  public campos: Array<NomenclaturaCampoDTO>;

  /***************** Variables utilizadas en Angular *****************/
  /** Es el color background de la nomenclatura a visualizar en pantalla */
  public bgColor: string;
}
