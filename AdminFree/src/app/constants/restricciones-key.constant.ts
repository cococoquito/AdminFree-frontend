/**
 * Clase constante que contiene los identificadores de las restricciones
 *
 * @author Carlos Andres Diaz
 */
export class RestriccionesKeyConstant {

  /** El campo es obligatorio */
  static readonly KEY_CAMPO_OBLIGATORIO: string = '1';

  /** El valor del campo debe ser solo números */
  static readonly KEY_CAMPO_SOLO_NUMEROS: string = '2';

  /** El valor por defecto de la fecha será la fecha actual y el usuario NO podrá modificar este valor */
  static readonly KEY_FECHA_ACTUAL_NO_MODIFICABLE: string = '5';

  /** El valor por defecto de la fecha será la fecha actual y el usuario SI podrá modificar este valor */
  static readonly KEY_FECHA_ACTUAL_SI_MODIFICABLE: string = '6';

  /** El valor de la fecha debe ser mayor a la fecha actual */
  static readonly KEY_FECHA_MAYOR_ACTUAL: string = '7';

  /** El valor de la fecha debe ser menor a la fecha actual */
  static readonly KEY_FECHA_MENOR_ACTUAL: string = '8';

  /** El valor inicial de la casilla será "NO" */
  static readonly KEY_VALOR_INICIAL_CASILLA_NO: number = 9;

  /** El valor inicial de la casilla será "SI" */
  static readonly KEY_VALOR_INICIAL_CASILLA_SI: string = '10';

  /** El valor de la fecha debe ser mayor o igual que la fecha actual */
  static readonly KEY_FECHA_MAYOR_IGUAL_ACTUAL: string = '11';

  /** El valor de la fecha debe ser menor o igual que la fecha actual */
  static readonly KEY_FECHA_MENOR_IGUAL_ACTUAL: string = '12';
}
