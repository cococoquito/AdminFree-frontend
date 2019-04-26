import { TipoDocumentalDTO } from './tipo-documental.dto';

/**
 * Contiene los datos comunes entre la serie y subserie
 *
 * @author Carlos Andres Diaz
 */
export class Documental {

  /** Codigo de la serie o subserie */
  protected codigo: string;

  /** Nombre de la serie o subserie */
  protected nombre: string;

  /** Tiempo en archivo gestion */
  protected AG: number;

  /** Tiempo en archivo central */
  protected AC: number;

  /** Conservacion total */
  protected CT: boolean;

  /** Microfilmacion / digitalizacion */
  protected M: boolean;

  /** Seleccion */
  protected S: boolean;

  /** Eliminacion */
  protected E: boolean;

  /** Procedimiento de la serie o sub-serie */
  protected procedimiento: string;

  /** Fecha de creacion de la serie o sub-serie */
  protected fechaCreacion: Date;

  /** Identificador del usuario para la creacion de la serie o sub-serie */
  protected idUsuarioCreacion: number;

  /** Identificador del cliente asociado a esta serie */
  protected idCliente: number;

  /** Identifica que tipo de accion se va realizar sobre la serie o subserie */
  protected tipoEvento: string;

  /** Son los tipos documentales que soporta la serie o subserie */
  protected tiposDocumentales: Array<TipoDocumentalDTO>;
}
