/**
 * DTO que contiene los atributos de un documento para el cargue o lectura de
 * los archivos asociados a un consecutivo
 *
 * @author Carlos Andres Diaz
 */
export class DocumentoDTO {

  /** Identificador del documento */
  public id: number;

  /** Identificador del cliente */
  public idCliente: string;

  /** Nombre del documento */
  public nombreDocumento: string;

  /** Tipo de documento PDF, excel, word */
  public tipoDocumento: string;

  /** Es el tamanio del documento */
  public sizeDocumento: string;

  /** Fecha en la que se realizo el cargue del documento */
  public fechaCargue: string;
}
