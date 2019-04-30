import { TipoDocumentalDTO } from './tipo-documental.dto';

/**
 * Contiene los datos comunes entre la serie y subserie
 *
 * @author Carlos Andres Diaz
 */
export class Documental {

  /** Codigo de la serie o subserie */
  public codigo: string;

  /** Nombre de la serie o subserie */
  public nombre: string;

  /** Tiempo en archivo gestion */
  public AG: number;

  /** Tiempo en archivo central */
  public AC: number;

  /** Conservacion total */
  public CT: boolean;

  /** Microfilmacion / digitalizacion */
  public M: boolean;

  /** Seleccion */
  public S: boolean;

  /** Eliminacion */
  public E: boolean;

  /** Procedimiento de la serie o sub-serie */
  public procedimiento: string;

  /** Fecha de creacion de la serie o sub-serie */
  public fechaCreacion: Date;

  /** Identificador del usuario para la creacion de la serie o sub-serie */
  public idUsuarioCreacion: number;

  /** Identificador del cliente asociado a esta serie */
  public idCliente: number;

  /** Identifica que tipo de accion se va realizar sobre la serie o subserie */
  public tipoEvento: string;

  /** Son los tipos documentales que soporta la serie o subserie */
  public tiposDocumentales: Array<TipoDocumentalDTO>;
}
