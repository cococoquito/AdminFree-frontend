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

  /** Tiempo en archivo gestion (AG)*/
  public tiempoArchivoGestion: any;

  /** Tiempo en archivo central (AC) */
  public tiempoArchivoCentral: any;

  /** Conservacion total (CT)*/
  public conservacionTotal: boolean;

  /** Microfilmacion / digitalizacion (M) */
  public microfilmacion: boolean;

  /** Seleccion (S)*/
  public seleccion: boolean;

  /** Eliminacion (E)*/
  public eliminacion: boolean;

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

  /** **********************VARIABLES UTILIZADAS EN ANGULAR**************************** */

  /** Bandera que indica si el campo CODIGO es invalido al momento de crear/editar*/
  public esCodigoInvalido: boolean;

  /** Bandera que indica si el campo NOMBRE es invalido al momento de crear/editar*/
  public esNombreInvalido: boolean;

  /** Bandera que indica si el campo AG es invalido al momento de crear/editar*/
  public esAGInvalido: boolean;

  /** Bandera que indica si el campo AC es invalido al momento de crear/editar*/
  public esACInvalido: boolean;
}
