/**
 * Contiene el valor del campo de entrada para el proceso de
 * solicitar o edicion de un consecutivo de correspondencia
 *
 * @author Carlos Andres Diaz
 *
 */
export class CampoEntradaValueDTO  {

  /** Es el valor ingresado por el usuario al momento de solicitar o editar consecutivo */
  public value: any;

  /** Identifica el tipo de campo del value */
  public tipoCampo: number;

  /** Identificador de la siguiente tabla NOMENCLATURAS_CAMPOS_ENTRADA.ID_NOME_CAMPO */
  public idCampoNomenclatura: number;

  /** Son las restricciones del campo, se utiliza para hacer las validaciones correspondiente */
  public restricciones: Array<string>;
}
