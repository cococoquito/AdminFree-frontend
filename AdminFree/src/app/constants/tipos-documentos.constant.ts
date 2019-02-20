/**
 * Clase constante que contiene los tipos de documentos
 * permitidos para el cargue de archivos
 *
 * @author Carlos Andres Diaz
 */
export class TiposDocumentosConstant {

  /** Extension MIME para documentos PDF */
  public static readonly PDF = 'application/pdf';

  /** Extension MIME para documentos microsoft EXCEL */
  public static readonly XLS = 'application/vnd.ms-excel';
  public static readonly XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  /** Extension MIME para documentos microsoft WORD */
  public static readonly DOC = 'application/msword';
  public static readonly DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  /** Extension MIME para documentos de OPEN OFFICE */
  public static readonly OPEN_DOC = 'application/vnd.oasis.opendocument.text';

  /** Extension MIME para documentos de microsoft POWERPOINT */
  public static readonly PPT = 'application/vnd.ms-powerpoint';
  public static readonly PPTX = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

  /**
   * Metodo que permite retornar todos los tipos de documentos
   */
  public static getAll(): string {
    return TiposDocumentosConstant.PDF + ',' +
    TiposDocumentosConstant.XLS + ',' +
    TiposDocumentosConstant.XLSX + ',' +
    TiposDocumentosConstant.DOC + ',' +
    TiposDocumentosConstant.DOCX + ',' +
    TiposDocumentosConstant.OPEN_DOC + ',' +
    TiposDocumentosConstant.PPT + ',' +
    TiposDocumentosConstant.PPTX;
  }
}
