/**
 * Contiene el valor del campo de entrada para el proceso de
 * solicitar o edicion de un consecutivo de correspondencia
 *
 * @author Carlos Andres Diaz
 */
export class CampoEntradaValueDTO  {

  /** Es el identificador del value CONSECUTIVOS_VALUES.ID_VALUE */
  public idValue: number;

  /** Es el identificador del campo CAMPOS_ENTRADA.ID_CAMPO */
  public idCampo: number;

  /** Es el valor ingresado por el usuario al momento de solicitar o editar consecutivo */
  public value: any;

  /** Es el nombre del campo, se utiliza para las validaciones */
  public nombreCampo: string;

  /** Identificador de la siguiente tabla NOMENCLATURAS_CAMPOS_ENTRADA.ID_NOME_CAMPO */
  public idCampoNomenclatura: number;

  /** Se utiliza para hacer las validaciones correspondiente al momento de editar o solicitar */
  public restricciones: Array<string>;
}
