import { CampoEntradaDetalleDTO } from './../dtos/correspondencia/campo-entrada-detalle.dto';

/**
 * Contiene el model de un campo de entrada informacion a visualizar en pantalla
 *
 * @author Carlos Andres Diaz
 *
 */
export class CampoModel {

  /** Contiene los datos del campo */
  public campo: CampoEntradaDetalleDTO;

  /** Es el valor ingresado o seleccionado */
  public valor: any;

  /** Indica si el campo es requerido */
  public isRequerido: boolean;

  /** Indica si el campo de texto debe ser solo numeros */
  public isSoloNumeros: boolean;

  /** El valor por defecto de la fecha será la fecha actual y el usuario NO podrá modificar este valor */
  public isFechaActualNoEditable: boolean;

  /** El valor por defecto de la fecha será la fecha actual y el usuario SI podrá modificar este valor */
  public isFechaActualSiEditable: boolean;

  /** El valor de la fecha debe ser mayor a la fecha actual */
  public isFechaMayorActual: boolean;

  /** El valor de la fecha debe ser menor a la fecha actual */
  public isFechaMenorActual: boolean;

  /** Indica si el componente tiene un valor valido */
  public isValido: boolean;
}
