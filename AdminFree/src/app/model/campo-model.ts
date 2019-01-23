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

  /** Date minimo para el componente calendar */
  public minDate: Date;

  /** Date maximo para el componente calendar */
  public maxDate: Date;

  /** Indica si el componente tiene un valor valido */
  public isValido: boolean;
}
